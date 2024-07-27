"use server";

import { Paginate, paginateToLimitAndOffset, toPaginated } from "@/common/pagination";
import { countTotalRecords } from "@/common/server-actions";
import { db } from "@/db/db";
import { transactionCategories, transactions, wallets } from "@/db/schema/accounting";
import { TransactionCreateForm } from "@/modules/accounting/schemas/transaction-create-form-schema";
import { WalletCreateForm } from "@/modules/accounting/schemas/wallet-create-form-schema";
import { desc, eq, or } from "drizzle-orm";
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

export async function getTransactionCategories() {
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

export async function transactionsGetPaginated(options: {
  paginate: Paginate;
  walletId: string | undefined;
}) {
  // TODO: total is not correct with a walletId
  const total = await countTotalRecords(transactions);
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
