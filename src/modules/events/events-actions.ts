"use server";

import { getCurrentUserId } from "@/common/utils/auth";
import { db } from "@/db/db";
import { events } from "@/db/schema/events";
import { desc, eq } from "drizzle-orm";

export async function eventsGetAll() {
  const userId = await getCurrentUserId();
  return await db.query.events.findMany({
    with: {
      category: true,
    },
    where: eq(events.userId, userId),
    orderBy: desc(events.startDatetime),
  });
}
