"use server";

import { and, eq, ilike } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";
import {
  type Paginate,
  paginateToLimitAndOffset,
  toPaginated,
} from "@/common/pagination";
import { placesRoute } from "@/common/routes";
import { getCurrentUserId } from "@/common/utils/auth";
import { db } from "@/db/db";
import { placeCategories, places } from "@/db/schemas/places";
import type { CreatePlaceFormType } from "@/modules/places/schemas/create-place-form-schema";
import type { UpdatePlaceFormType } from "@/modules/places/schemas/update-place-form-schema";

export async function placeCategoriesGetPaginated(params: {
  paginate: Paginate;
  query?: string;
}) {
  const userId = await getCurrentUserId();
  const { limit, offset } = paginateToLimitAndOffset(params.paginate);
  const total = (
    await db
      .select({ id: placeCategories.id })
      .from(placeCategories)
      .where(
        and(
          eq(placeCategories.userId, userId),
          params.query
            ? ilike(placeCategories.name, `%${params.query}%`)
            : undefined,
        ),
      )
  ).length;
  const records = await db.query.placeCategories.findMany({
    where: and(
      eq(placeCategories.userId, userId),
      params.query
        ? ilike(placeCategories.name, `%${params.query}%`)
        : undefined,
    ),
    limit,
    offset,
    orderBy: [placeCategories.name],
  });
  return toPaginated(records, total);
}

export async function placeCategoriesGetAll(params: { query?: string } = {}) {
  const userId = await getCurrentUserId();
  return await db.query.placeCategories.findMany({
    where: and(
      eq(placeCategories.userId, userId),
      params.query
        ? ilike(placeCategories.name, `%${params.query}%`)
        : undefined,
    ),
    orderBy: [placeCategories.name],
  });
}

export async function placesGetPaginated(params: {
  paginate: Paginate;
  query?: string;
  categoryId?: string;
}) {
  const userId = await getCurrentUserId();
  const { limit, offset } = paginateToLimitAndOffset(params.paginate);

  const total = (
    await db
      .select({ id: places.id })
      .from(places)
      .where(
        and(
          eq(places.userId, userId),
          params.query ? ilike(places.name, `%${params.query}%`) : undefined,
          params.categoryId
            ? eq(places.categoryId, params.categoryId)
            : undefined,
        ),
      )
  ).length;

  const records = await db.query.places.findMany({
    with: {
      category: true,
    },
    limit,
    offset,
    where: and(
      eq(places.userId, userId),
      params.query ? ilike(places.name, `%${params.query}%`) : undefined,
      params.categoryId ? eq(places.categoryId, params.categoryId) : undefined,
    ),
    orderBy: [places.name],
  });

  return toPaginated(records, total);
}

export async function placesGetAll(
  params: { query?: string; categoryId?: string } = {},
) {
  const userId = await getCurrentUserId();
  return await db.query.places.findMany({
    with: {
      category: true,
    },
    where: and(
      eq(places.userId, userId),
      params.query ? ilike(places.name, `%${params.query}%`) : undefined,
      params.categoryId ? eq(places.categoryId, params.categoryId) : undefined,
    ),
    orderBy: [places.name],
  });
}

export async function placesGetById(id: string) {
  const userId = await getCurrentUserId();
  const record = await db.query.places.findFirst({
    with: {
      category: true,
    },
    where: and(eq(places.userId, userId), eq(places.id, id)),
  });
  if (!record) {
    notFound();
  }
  return record;
}

export async function placesCreate(place: CreatePlaceFormType) {
  const userId = await getCurrentUserId();
  // TODO: pass coordinates
  await db.insert(places).values({
    userId,
    categoryId: place.categoryId,
    name: place.name,
    address: place.address,
    isVisited: place.isVisited,
  });
  revalidatePath(placesRoute);
  redirect(placesRoute);
}

export async function placesUpdate(place: UpdatePlaceFormType) {
  await db
    .update(places)
    .set({
      categoryId: place.categoryId,
      name: place.name,
      address: place.address,
      isVisited: place.isVisited,
    })
    .where(eq(places.id, place.id));
  revalidatePath(placesRoute);
  redirect(placesRoute);
}

export async function placesDelete(formData: FormData) {
  const id = z.string().parse(formData.get("id"));
  await db.delete(places).where(eq(places.id, id));
  revalidatePath(placesRoute);
}
