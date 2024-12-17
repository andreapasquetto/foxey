"use server";

import { Paginate, paginateToLimitAndOffset, toPaginated } from "@/common/pagination";
import { db } from "@/db/db";
import { placeCategories, places } from "@/db/schema/places";
import { PlaceCreateForm } from "@/modules/places/schemas/place-create-form-schema";
import { PlaceRead } from "@/modules/places/schemas/place-read-schema";
import { PlaceUpdateForm } from "@/modules/places/schemas/place-update-form-schema";
import { and, eq, ilike } from "drizzle-orm";

export async function placeCategoriesGetAll() {
  return await db.select().from(placeCategories);
}

export async function placeCategoryGetById(id: string) {
  return (await db.select().from(placeCategories).where(eq(placeCategories.id, id)))[0];
}

export async function placesGetPaginated(params: {
  paginate: Paginate;
  searchFilter?: string;
  categoryId?: string;
  onlyVisited?: boolean;
}) {
  const categories = await placeCategoriesGetAll();

  const total = await placesCountTotal(params);
  const { limit, offset } = paginateToLimitAndOffset(params.paginate);
  const records = await db
    .select()
    .from(places)
    .where(
      and(
        params.searchFilter ? ilike(places.name, `%${params.searchFilter}%`) : undefined,
        params.categoryId ? eq(places.categoryId, params.categoryId) : undefined,
        params.onlyVisited ? eq(places.isVisited, true) : undefined,
      ),
    )
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

export async function placeGetById(id: string) {
  const record = (await db.select().from(places).where(eq(places.id, id)))[0];
  const category = record.categoryId ? await placeCategoryGetById(record.categoryId) : null;
  return { ...record, category };
}

export async function placeCreate(place: PlaceCreateForm) {
  // TODO: pass coordinates
  await db.insert(places).values({
    categoryId: place.categoryId,
    name: place.name,
    address: place.address,
    isVisited: place.isVisited,
  });
}

export async function placeUpdate(place: PlaceUpdateForm) {
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

export async function placeDelete(id: string) {
  await db.delete(places).where(eq(places.id, id));
}

async function placesCountTotal(params: {
  paginate: Paginate;
  searchFilter?: string;
  categoryId?: string;
  onlyVisited?: boolean;
}) {
  const records = await db
    .select()
    .from(places)
    .where(
      and(
        params.searchFilter ? ilike(places.name, `%${params.searchFilter}%`) : undefined,
        params.categoryId ? eq(places.categoryId, params.categoryId) : undefined,
        params.onlyVisited ? eq(places.isVisited, true) : undefined,
      ),
    );

  return records.length;
}
