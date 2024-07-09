"use server";

import { db } from "@/db/db";
import { transactions, wallets } from "@/db/schema/accounting";

export async function getWallets() {
  return await db.select().from(wallets);
}

export async function getTransactions() {
  return await db.select().from(transactions);
}
