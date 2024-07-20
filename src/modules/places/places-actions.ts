"use server";

import { db } from "@/db/db";
import { placeCategories, places } from "@/db/schema/places";
import { PlaceCreateForm } from "@/modules/places/schemas/place-create-form-schema";

export async function getPlaceCategories() {
  return await db.select().from(placeCategories);
}

export async function getPlaces() {
  return await db.select().from(places);
}

export async function createPlace(place: PlaceCreateForm) {
  await db.insert(places).values({
    categoryId: place.categoryId,
    name: place.name,
    address: place.address,
    isVisited: place.isVisited,
  });
}
