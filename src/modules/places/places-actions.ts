"use server";

import { Paginate, paginateToLimitAndOffset, toPaginated } from "@/common/pagination";
import { countTotalRecords } from "@/common/server-actions";
import { db } from "@/db/db";
import { placeCategories, places } from "@/db/schema/places";
import { PlaceCreateForm } from "@/modules/places/schemas/place-create-form-schema";
import { PlaceRead } from "@/modules/places/schemas/place-read-schema";
import { eq } from "drizzle-orm";

export async function placeCategoriesGetAll() {
  return await db.select().from(placeCategories);
}

export async function placesGetPaginated(paginate: Paginate) {
  const categories = await placeCategoriesGetAll();

  const total = await countTotalRecords(places);
  const { limit, offset } = paginateToLimitAndOffset(paginate);
  const records = await db
    .select()
    .from(places)
    .limit(limit)
    .offset(offset)
    .orderBy(places.categoryId, places.name);

  const result: PlaceRead[] = [];
  for (const record of records) {
    const category = categories.find((c) => c.id === record.categoryId) ?? null;
    result.push({ ...record, category });
  }
  return toPaginated(result, total);
}

export async function placesGetAll() {
  const categories = await placeCategoriesGetAll();

  const records = await db.select().from(places).orderBy(places.categoryId, places.name);

  const result: PlaceRead[] = [];
  for (const record of records) {
    const category = categories.find((c) => c.id === record.categoryId) ?? null;
    result.push({ ...record, category });
  }

  return result;
}

export async function createPlace(place: PlaceCreateForm) {
  // TODO: pass coordinates
  await db.insert(places).values({
    categoryId: place.categoryId,
    name: place.name,
    address: place.address,
    isVisited: place.isVisited,
  });
}

export async function deletePlace(id: string) {
  await db.delete(places).where(eq(places.id, id));
}
