"use server";

import { db } from "@/db/db";
import { wallets } from "@/db/schema";

export async function getWallets() {
  return await db.select().from(wallets);
}
