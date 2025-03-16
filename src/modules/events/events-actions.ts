"use server";

import { getCurrentUserId } from "@/common/utils/auth";
import { db } from "@/db/db";
import { eventCategories, events } from "@/db/schemas/events";
import { EventCategoryCreateForm } from "@/modules/events/schemas/event-category-create-form-schema";
import { EventCreateForm } from "@/modules/events/schemas/event-create-form-schema";
import { startOfDay } from "date-fns";
import { and, eq } from "drizzle-orm";

export async function eventCategoriesCreate(values: EventCategoryCreateForm) {
  const userId = await getCurrentUserId();
  await db.insert(eventCategories).values({ userId, name: values.name });
}

export async function eventCategoriesGetAll() {
  const userId = await getCurrentUserId();
  return await db.query.eventCategories.findMany({
    where: eq(eventCategories.userId, userId),
    orderBy: [eventCategories.name],
  });
}

export async function eventsCreate(values: EventCreateForm) {
  const userId = await getCurrentUserId();
  await db.insert(events).values({
    userId,
    categoryId: values.categoryId,
    placeId: values.placeId,
    title: values.title,
    description: values.description,
    isAllDay: values.isAllDay,
    datetime: values.isAllDay ? startOfDay(values.datetime) : values.datetime,
  });
}

// TODO: add dateRange filter
export async function eventsGetAll() {
  const userId = await getCurrentUserId();
  return await db.query.events.findMany({
    with: {
      category: true,
      place: true,
    },
    where: eq(events.userId, userId),
    orderBy: [events.datetime],
  });
}

export async function eventsToggleCancel(id: string) {
  const userId = await getCurrentUserId();
  const record = await db.query.events.findFirst({
    where: and(eq(events.userId, userId), eq(events.id, id)),
  });

  if (!record) {
    // TODO: return "error result" instead of throwing
    throw new Error("Not Found");
  }

  await db
    .update(events)
    .set({ isCanceled: !record.isCanceled })
    .where(and(eq(events.userId, userId), eq(events.id, id)));
}

export async function eventsDelete(id: string) {
  const userId = await getCurrentUserId();
  await db.delete(events).where(and(eq(events.userId, userId), eq(events.id, id)));
}
