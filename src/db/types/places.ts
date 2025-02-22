import { placeCategoriesGetAll, placesGetById } from "@/modules/places/places-actions";

export type PlaceCategory = Awaited<ReturnType<typeof placeCategoriesGetAll>>[number];

export type Place = Awaited<ReturnType<typeof placesGetById>>;
