"use server";

import { db } from "@/db/db";
import { transactions, wallets } from "@/db/schema/accounting";
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
