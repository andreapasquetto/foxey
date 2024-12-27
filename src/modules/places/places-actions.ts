"use server";

import { Paginate, paginateToLimitAndOffset, toPaginated } from "@/common/pagination";
import { db } from "@/db/db";
import { placeCategories, places } from "@/db/schema/places";
import { PlaceCategoryRead } from "@/modules/places/schemas/place-category-read-schema";
import { PlaceCreateForm } from "@/modules/places/schemas/place-create-form-schema";
import { PlaceRead } from "@/modules/places/schemas/place-read-schema";
import { PlaceUpdateForm } from "@/modules/places/schemas/place-update-form-schema";
import { and, eq, ilike } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

export async function placeCategoriesGetPaginated(params: {
  paginate: Paginate;
  searchFilter?: string;
}) {
  const total = await placeCategoriesCountTotal(params);
  const { limit, offset } = paginateToLimitAndOffset(params.paginate);

  const parent = alias(placeCategories, "parent");
  const records = await db
    .select({
      id: placeCategories.id,
      name: placeCategories.name,
      parent: {
        id: parent.id,
        name: parent.name,
      },
    })
    .from(placeCategories)
    .leftJoin(parent, eq(parent.id, placeCategories.parentId))
    .where(
      params.searchFilter ? ilike(placeCategories.name, `%${params.searchFilter}%`) : undefined,
    )
    .limit(limit)
    .offset(offset)
    .orderBy(parent.name, placeCategories.name);

  const result: PlaceCategoryRead[] = [];
  for (const record of records) {
    const usages = await placeCategoryCountUsages(record.id);
    result.push({ ...record, usages });
  }

  return toPaginated(result, total);
}

export async function placeCategoriesGetAll() {
  const parent = alias(placeCategories, "parent");
  return await db
    .select({
      id: placeCategories.id,
      name: placeCategories.name,
      parent: {
        id: parent.id,
        name: parent.name,
      },
    })
    .from(placeCategories)
    .leftJoin(parent, eq(parent.id, placeCategories.parentId))
    .orderBy(parent.name, placeCategories.name);
}

export async function placeCategoryGetById(id: string) {
  const parent = alias(placeCategories, "parent");
  return (
    await db
      .select({
        id: placeCategories.id,
        name: placeCategories.name,
        parent: {
          id: parent.id,
          name: parent.name,
        },
      })
      .from(placeCategories)
      .leftJoin(parent, eq(parent.id, placeCategories.parentId))
      .where(eq(placeCategories.id, id))
  )[0];
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

async function placeCategoriesCountTotal(params: { searchFilter?: string }) {
  const records = await db
    .select({ id: placeCategories.id })
    .from(placeCategories)
    .where(
      params.searchFilter ? ilike(placeCategories.name, `%${params.searchFilter}%`) : undefined,
    );
  return records.length;
}

async function placesCountTotal(params: {
  searchFilter?: string;
  categoryId?: string;
  onlyVisited?: boolean;
}) {
  const records = await db
    .select({ id: places.id })
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

async function placeCategoryCountUsages(id: string) {
  const records = await db.select({ id: places.id }).from(places).where(eq(places.categoryId, id));
  return records.length;
}
