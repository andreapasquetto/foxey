"use server";

import { startOfDay } from "date-fns";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { z } from "zod";
import { eventsRoute } from "@/common/routes";
import { getCurrentUserId } from "@/common/utils/auth";
import { db } from "@/db/db";
import { eventCategories, events } from "@/db/schemas/events";
import type { CreateEventFormType } from "@/modules/events/schemas/create-event-form-schema";

export async function getAllEventCategories() {
  const userId = await getCurrentUserId();
  return await db.query.eventCategories.findMany({
    where: eq(eventCategories.userId, userId),
    orderBy: [eventCategories.name],
  });
}

export async function createEvent(values: CreateEventFormType) {
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
  revalidatePath(eventsRoute);
}

// TODO: add dateRange filter
export async function getAllEvents() {
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

export async function cancelOrRestoreEvent(formData: FormData) {
  const id = z.string().parse(formData.get("id"));
  const userId = await getCurrentUserId();
  const record = await db.query.events.findFirst({
    where: and(eq(events.userId, userId), eq(events.id, id)),
  });
  if (!record) {
    notFound();
  }
  await db
    .update(events)
    .set({ isCanceled: !record.isCanceled })
    .where(and(eq(events.userId, userId), eq(events.id, id)));
  revalidatePath(eventsRoute);
}

export async function deleteEvent(formData: FormData) {
  const id = z.string().parse(formData.get("id"));
  const userId = await getCurrentUserId();
  await db
    .delete(events)
    .where(and(eq(events.userId, userId), eq(events.id, id)));
  revalidatePath(eventsRoute);
}
