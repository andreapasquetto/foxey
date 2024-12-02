"use server";

import { Paginate, paginateToLimitAndOffset, toPaginated } from "@/common/pagination";
import { db } from "@/db/db";
import {
  tags,
  transactionCategories,
  transactions,
  transactionTags,
  wallets,
} from "@/db/schema/accounting";
import {
  TransactionCreateForm,
  TransactionUpdateForm,
} from "@/modules/accounting/schemas/transaction-create-form-schema";
import { TransactionRead } from "@/modules/accounting/schemas/transaction-read-schema";
import { WalletCreateForm } from "@/modules/accounting/schemas/wallet-create-form-schema";
import { placeGetById, placesGetAll } from "@/modules/places/places-actions";
import { and, between, desc, eq, ilike, or } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { DateRange } from "react-day-picker";

export async function walletsGetAll() {
  return await db.select().from(wallets).orderBy(desc(wallets.amount));
}

async function walletGetById(id: string) {
  return (await db.select().from(wallets).where(eq(wallets.id, id)))[0];
}

export async function walletCreate(wallet: WalletCreateForm) {
  await db.insert(wallets).values({
    name: wallet.name,
    initialAmount: wallet.initialAmount.toString(),
    amount: (wallet.initialAmount ?? 0).toString(),
  });
}

export async function transactionCategoriesGetAll() {
  const parent = alias(transactionCategories, "parent");
  return await db
    .select({
      id: transactionCategories.id,
      name: transactionCategories.name,
      parent: {
        id: parent.id,
        name: parent.name,
      },
    })
    .from(transactionCategories)
    .leftJoin(parent, eq(parent.id, transactionCategories.parentId))
    .orderBy(parent.name, transactionCategories.name);
}

async function transactionCategoryGetById(id: string) {
  const parent = alias(transactionCategories, "parent");

  return (
    await db
      .select({
        id: transactionCategories.id,
        name: transactionCategories.name,
        parent: {
          id: parent.id,
          name: parent.name,
        },
      })
      .from(transactionCategories)
      .leftJoin(parent, eq(parent.id, transactionCategories.parentId))
      .where(eq(transactionCategories.id, id))
  )[0];
}

export async function transactionsGetPaginated(params: {
  paginate: Paginate;
  walletId?: string;
  dateRange?: DateRange;
  searchFilter?: string;
}) {
  const wallets = await walletsGetAll();
  const categories = await transactionCategoriesGetAll();
  const places = await placesGetAll();

  const total = await transactionsCountTotal(params);
  const { limit, offset } = paginateToLimitAndOffset(params.paginate);
  const records = await db
    .select()
    .from(transactions)
    .where(
      and(
        params.walletId
          ? or(
              eq(transactions.fromWalletId, params.walletId),
              eq(transactions.toWalletId, params.walletId),
            )
          : undefined,
        params.dateRange?.from && params.dateRange.to
          ? between(transactions.datetime, params.dateRange.from, params.dateRange.to)
          : undefined,
        params.searchFilter
          ? ilike(transactions.description, `%${params.searchFilter}%`)
          : undefined,
      ),
    )
    .limit(limit)
    .offset(offset)
    .orderBy(desc(transactions.datetime));

  const result: TransactionRead[] = [];
  for (const transaction of records) {
    const fromWallet = wallets.find((w) => w.id === transaction.fromWalletId) ?? null;
    const toWallet = wallets.find((w) => w.id === transaction.toWalletId) ?? null;
    const category = categories.find((c) => c.id === transaction.categoryId) ?? null;
    const place = places.find((p) => p.id === transaction.placeId) ?? null;

    const txTags = await db
      .select({
        id: tags.id,
        name: tags.name,
      })
      .from(transactionTags)
      .innerJoin(tags, eq(transactionTags.tagId, tags.id))
      .where(eq(transactionTags.transactionId, transaction.id));

    result.push({
      id: transaction.id,
      datetime: transaction.datetime,
      amount: transaction.amount,
      description: transaction.description,
      fromWallet,
      toWallet,
      category,
      place,
      tags: txTags,
    });
  }

  return toPaginated(result, total);
}

export async function transactionsGetAll(
  params: { walletId?: string; dateRange?: DateRange } = {},
) {
  const wallets = await walletsGetAll();
  const categories = await transactionCategoriesGetAll();
  const places = await placesGetAll();

  const records = await db
    .select()
    .from(transactions)
    .where(
      and(
        params.walletId
          ? or(
              eq(transactions.fromWalletId, params.walletId),
              eq(transactions.toWalletId, params.walletId),
            )
          : undefined,
        params.dateRange?.from && params.dateRange.to
          ? between(transactions.datetime, params.dateRange.from, params.dateRange.to)
          : undefined,
      ),
    )
    .orderBy(transactions.datetime);

  const result: TransactionRead[] = [];
  for (const transaction of records) {
    const fromWallet = wallets.find((w) => w.id === transaction.fromWalletId) ?? null;
    const toWallet = wallets.find((w) => w.id === transaction.toWalletId) ?? null;
    const category = categories.find((c) => c.id === transaction.categoryId) ?? null;
    const place = places.find((p) => p.id === transaction.placeId) ?? null;

    const txTags = await db
      .select({
        id: tags.id,
        name: tags.name,
      })
      .from(transactionTags)
      .innerJoin(tags, eq(transactionTags.tagId, tags.id))
      .where(eq(transactionTags.transactionId, transaction.id));

    result.push({ ...transaction, fromWallet, toWallet, category, place, tags: txTags });
  }

  return result;
}

export async function transactionGetById(id: string) {
  const record = (
    await db
      .select()
      .from(transactions)
      .where(and(eq(transactions.id, id)))
  )[0];

  const fromWallet = record.fromWalletId ? await walletGetById(record.fromWalletId) : null;
  const toWallet = record.toWalletId ? await walletGetById(record.toWalletId) : null;
  const place = record.placeId ? await placeGetById(record.placeId) : null;
  const category = record.categoryId ? await transactionCategoryGetById(record.categoryId) : null;

  const txTags = await db
    .select({
      id: tags.id,
      name: tags.name,
    })
    .from(transactionTags)
    .innerJoin(tags, eq(transactionTags.tagId, tags.id))
    .where(eq(transactionTags.transactionId, id));

  return { ...record, fromWallet, toWallet, category, place, tags: txTags };
}

export async function transactionCreate(tx: TransactionCreateForm) {
  await db.insert(transactions).values({
    datetime: tx.datetime,
    fromWalletId: tx.fromWalletId,
    toWalletId: tx.toWalletId,
    categoryId: tx.categoryId,
    placeId: tx.placeId,
    amount: tx.amount.toString(),
    description: tx.description,
  });
}

export async function transactionUpdate(tx: TransactionUpdateForm) {
  await db
    .update(transactions)
    .set({
      datetime: tx.datetime,
      fromWalletId: tx.fromWalletId,
      toWalletId: tx.toWalletId,
      categoryId: tx.categoryId,
      placeId: tx.placeId,
      amount: tx.amount.toString(),
      description: tx.description,
    })
    .where(eq(transactions.id, tx.id));
}

// TODO: update wallet amount
export async function transactionDelete(id: string) {
  await db.delete(transactions).where(eq(transactions.id, id));
}

async function transactionsCountTotal(params: {
  paginate: Paginate;
  walletId?: string;
  dateRange?: DateRange;
  searchFilter?: string;
}) {
  const records = await db
    .select()
    .from(transactions)
    .where(
      and(
        params.walletId
          ? or(
              eq(transactions.fromWalletId, params.walletId),
              eq(transactions.toWalletId, params.walletId),
            )
          : undefined,
        params.dateRange?.from && params.dateRange.to
          ? between(transactions.datetime, params.dateRange.from, params.dateRange.to)
          : undefined,
        params.searchFilter
          ? ilike(transactions.description, `%${params.searchFilter}%`)
          : undefined,
      ),
    );

  return records.length;
}
