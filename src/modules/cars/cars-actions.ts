"use server";

import { db } from "@/db/db";
import { cars, highwayTrips, refuelings } from "@/db/schema";

export async function getCars() {
  return await db.select().from(cars);
}

export async function getRefuelings() {
  return await db.select().from(refuelings).orderBy(refuelings.date);
}

export async function getHighwayTrips() {
  return await db.select().from(highwayTrips).orderBy(highwayTrips.date);
}
