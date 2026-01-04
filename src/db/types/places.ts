import type {
  getAllPlaceCategories,
  getPlaceById,
} from "@/modules/places/server-actions";

export type PlaceCategory = Awaited<
  ReturnType<typeof getAllPlaceCategories>
>[number];

export type Place = Awaited<ReturnType<typeof getPlaceById>>;
