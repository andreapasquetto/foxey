"use server";

import { db } from "@/db/db";
import { cars, refuelings } from "@/db/schema";

export async function getCars() {
  return await db.select().from(cars);
}

export async function getRefuelings() {
  return await db.select().from(refuelings).orderBy(refuelings.date);
}
