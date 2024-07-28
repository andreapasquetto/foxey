"use server";

import { Paginate, paginateToLimitAndOffset, toPaginated } from "@/common/pagination";
import { countTotalRecords } from "@/common/server-actions";
import { db } from "@/db/db";
import { placeCategories, places } from "@/db/schema/places";
import { PlaceCreateForm } from "@/modules/places/schemas/place-create-form-schema";
import { eq } from "drizzle-orm";

export async function getPlaceCategories() {
  return await db.select().from(placeCategories);
}

export async function placesGetPaginated(paginate: Paginate) {
  const total = await countTotalRecords(places);
  const { limit, offset } = paginateToLimitAndOffset(paginate);
  const records = await db.select().from(places).limit(limit).offset(offset);
  return toPaginated(records, total);
}

export async function createPlace(place: PlaceCreateForm) {
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
