"use server";

import { db } from "@/db/db";
import { cars } from "@/db/schema";

export async function getCars() {
  return await db.select().from(cars);
}
