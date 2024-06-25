"use server";

import { db } from "@/db/db";
import { places } from "@/db/schema";

export async function getPlaces() {
  return await db.select().from(places);
}
