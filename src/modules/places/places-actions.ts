"use server";

import { Paginate, paginateToLimitAndOffset, toPaginated } from "@/common/pagination";
import { getCurrentUserId } from "@/common/utils/auth";
import { db } from "@/db/db";
import { placeCategories, places } from "@/db/schemas/places";
import { PlaceCreateForm } from "@/modules/places/schemas/place-create-form-schema";
import { PlaceUpdateForm } from "@/modules/places/schemas/place-update-form-schema";
import { and, eq, ilike } from "drizzle-orm";

export async function placeCategoriesGetAll() {
  const userId = await getCurrentUserId();
  return await db.query.placeCategories.findMany({
    where: eq(placeCategories.userId, userId),
    orderBy: [placeCategories.name],
  });
}

export async function placeCategoriesGetPaginated(params: {
  paginate: Paginate;
  searchFilter?: string;
}) {
  const userId = await getCurrentUserId();
  const { limit, offset } = paginateToLimitAndOffset(params.paginate);
  const total = await countTotalPlaceCategories(params);
  const records = await db.query.placeCategories.findMany({
    where: and(
      eq(placeCategories.userId, userId),
      params.searchFilter ? ilike(placeCategories.name, `%${params.searchFilter}%`) : undefined,
    ),
    limit,
    offset,
    orderBy: [placeCategories.name],
  });

  return toPaginated(records, total);
}

export async function placeCategoryGetById(id: string) {
  const userId = await getCurrentUserId();
  return await db.query.placeCategories.findFirst({
    where: and(eq(placeCategories.userId, userId), eq(placeCategories.id, id)),
  });
}

export async function placesGetAll() {
  const userId = await getCurrentUserId();
  return await db.query.places.findMany({
    with: {
      category: true,
    },
    where: eq(places.userId, userId),
    orderBy: [places.name],
  });
}

export async function placesGetPaginated(params: {
  paginate: Paginate;
  searchFilter?: string;
  categoryId?: string;
  onlyVisited?: boolean;
}) {
  const userId = await getCurrentUserId();
  const { limit, offset } = paginateToLimitAndOffset(params.paginate);
  const total = await countTotalPlaces(params);
  const records = await db.query.places.findMany({
    with: {
      category: true,
    },
    where: and(
      eq(places.userId, userId),
      params.searchFilter ? ilike(places.name, `%${params.searchFilter}%`) : undefined,
      params.categoryId ? eq(places.categoryId, params.categoryId) : undefined,
      params.onlyVisited ? eq(places.isVisited, true) : undefined,
    ),
    limit,
    offset,
    orderBy: [places.name],
  });

  return toPaginated(records, total);
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
    // TODO: return "error result" instead of throwing
    throw new Error("Not Found");
  }

  return record;
}

export async function placesCreate(place: PlaceCreateForm) {
  const userId = await getCurrentUserId();
  // TODO: pass coordinates
  await db.insert(places).values({
    userId,
    categoryId: place.categoryId,
    name: place.name,
    address: place.address,
    isVisited: place.isVisited,
  });
}

export async function placesUpdate(place: PlaceUpdateForm) {
  await db
    .update(places)
    .set({
      categoryId: place.categoryId,
      name: place.name,
      address: place.address,
      isVisited: place.isVisited,
    })
    .where(eq(places.id, place.id));
}

export async function placesDelete(id: string) {
  await db.delete(places).where(eq(places.id, id));
}

async function countTotalPlaceCategories(params: { searchFilter?: string }) {
  return (
    await db
      .select({ id: placeCategories.id })
      .from(placeCategories)
      .where(
        params.searchFilter ? ilike(placeCategories.name, `%${params.searchFilter}%`) : undefined,
      )
  ).length;
}

async function countTotalPlaces(params: {
  searchFilter?: string;
  categoryId?: string;
  onlyVisited?: boolean;
}) {
  const userId = await getCurrentUserId();
  return (
    await db
      .select({ id: places.id })
      .from(places)
      .where(
        and(
          eq(places.userId, userId),
          params.searchFilter ? ilike(places.name, `%${params.searchFilter}%`) : undefined,
          params.categoryId ? eq(places.categoryId, params.categoryId) : undefined,
          params.onlyVisited ? eq(places.isVisited, true) : undefined,
        ),
      )
  ).length;
}
