"use server";

import { Paginate, paginateToLimitAndOffset, toPaginated } from "@/common/pagination";
import { db } from "@/db/db";
import { transactionCategories, transactions, wallets } from "@/db/schema/accounting";
import { TransactionCreateForm } from "@/modules/accounting/schemas/transaction-create-form-schema";
import { WalletCreateForm } from "@/modules/accounting/schemas/wallet-create-form-schema";
import { endOfDay, endOfMonth, startOfMonth, startOfToday, sub } from "date-fns";
import { between, desc, eq, or } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

export async function getWallets() {
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

export async function transactionsGetMonthToDate() {
  const today = startOfToday();

  return await db
    .select()
    .from(transactions)
    .where(between(transactions.date, startOfMonth(today), endOfDay(today)))
    .orderBy(transactions.date);
}

export async function transactionsGetLastMonth() {
  const startOfLastMonth = startOfMonth(sub(startOfToday(), { months: 1 }));
  const endOfLastMonth = endOfDay(endOfMonth(startOfLastMonth));

  return await db
    .select()
    .from(transactions)
    .where(between(transactions.date, startOfLastMonth, endOfLastMonth))
    .orderBy(transactions.date);
}

export async function transactionsGetPaginated(options: { paginate: Paginate; walletId?: string }) {
  const total = await countTotalTransactions(options.walletId);

  const { limit, offset } = paginateToLimitAndOffset(options.paginate);
  const records = await db
    .select()
    .from(transactions)
    .where(
      options.walletId
        ? or(
            eq(transactions.fromWalletId, options.walletId),
            eq(transactions.toWalletId, options.walletId),
          )
        : undefined,
    )
    .limit(limit)
    .offset(offset)
    .orderBy(desc(transactions.date));
  return toPaginated(records, total);
}

// TODO: update wallet amount
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

async function countTotalTransactions(walletId?: string) {
  const totalRecordsQB = db.select().from(transactions);
  if (walletId) {
    totalRecordsQB.where(
      or(eq(transactions.fromWalletId, walletId), eq(transactions.toWalletId, walletId)),
    );
  }
  return (await totalRecordsQB).length;
}
