"use server";

import { Paginate, Paginated, paginateToLimitAndOffset, toPaginated } from "@/common/pagination";
import { db } from "@/db/db";
import { transactionCategories, transactions, wallets } from "@/db/schema/accounting";
import { TransactionCreateForm } from "@/modules/accounting/schemas/transaction-create-form-schema";
import { TransactionRead } from "@/modules/accounting/schemas/transaction-read-schema";
import { WalletCreateForm } from "@/modules/accounting/schemas/wallet-create-form-schema";
import { and, between, desc, eq, or } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { DateRange } from "react-day-picker";

export async function walletsGetAll() {
  return await db.select().from(wallets);
}

export async function createWallet(wallet: WalletCreateForm) {
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

export async function transactionsGetPaginated(params: {
  paginate: Paginate;
  walletId?: string;
  dateRange?: DateRange;
}): Promise<Paginated<TransactionRead>> {
  const wallets = await walletsGetAll();
  const categories = await transactionCategoriesGetAll();

  const total = await countTotalTransactions(params);
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
          ? between(transactions.date, params.dateRange.from, params.dateRange.to)
          : undefined,
      ),
    )
    .limit(limit)
    .offset(offset)
    .orderBy(desc(transactions.date));

  const result: TransactionRead[] = [];
  for (const transaction of records) {
    const fromWallet = wallets.find((w) => w.id === transaction.fromWalletId) ?? null;
    const toWallet = wallets.find((w) => w.id === transaction.toWalletId) ?? null;
    const category = categories.find((c) => c.id === transaction.categoryId) ?? null;
    result.push({ ...transaction, fromWallet, toWallet, category });
  }

  return toPaginated(result, total);
}

export async function transactionsGetAll(
  params: { walletId?: string; dateRange?: DateRange } = {},
): Promise<TransactionRead[]> {
  const wallets = await walletsGetAll();
  const categories = await transactionCategoriesGetAll();

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
          ? between(transactions.date, params.dateRange.from, params.dateRange.to)
          : undefined,
      ),
    )
    .orderBy(transactions.date);

  const result: TransactionRead[] = [];
  for (const transaction of records) {
    const fromWallet = wallets.find((w) => w.id === transaction.fromWalletId) ?? null;
    const toWallet = wallets.find((w) => w.id === transaction.toWalletId) ?? null;
    const category = categories.find((c) => c.id === transaction.categoryId) ?? null;
    result.push({ ...transaction, fromWallet, toWallet, category });
  }

  return result;
}

export async function createTransaction(tx: TransactionCreateForm) {
  await db.insert(transactions).values({
    date: tx.date,
    fromWalletId: tx.fromWalletId,
    toWalletId: tx.toWalletId,
    categoryId: tx.categoryId,
    amount: tx.amount.toString(),
    description: tx.description,
  });
}

// TODO: update wallet amount
export async function deleteTransaction(id: string) {
  await db.delete(transactions).where(eq(transactions.id, id));
}

async function countTotalTransactions(params: {
  paginate: Paginate;
  walletId?: string;
  dateRange?: DateRange;
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
          ? between(transactions.date, params.dateRange.from, params.dateRange.to)
          : undefined,
      ),
    );

  return records.length;
}
