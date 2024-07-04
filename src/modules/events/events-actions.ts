"use server";

import { db } from "@/db/db";
import { events } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getEvents() {
  return await db.select().from(events).orderBy(desc(events.startDatetime));
}
