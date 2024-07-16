"use server";

import { db } from "@/db/db";
import { transactions, wallets } from "@/db/schema/accounting";
import { TransactionCreateForm } from "@/modules/accounting/schemas/transaction-create-form-schema";
import { WalletCreateForm } from "@/modules/accounting/schemas/wallet-create-form-schema";

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

export async function getTransactions() {
  return await db.select().from(transactions);
}

// TODO: update wallet amount
export async function createTransaction(transaction: TransactionCreateForm) {
  await db.insert(transactions).values({
    datetime: transaction.datetime,
    from: transaction.from,
    to: transaction.to,
    amount: transaction.amount.toString(),
    description: transaction.description,
  });
}
