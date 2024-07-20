import { placeCategoriesQueryKey, placesQueryKey } from "@/common/query-keys";
import { getPlaceCategories, getPlaces } from "@/modules/places/places-actions";
import { useQuery } from "@tanstack/react-query";

export function usePlaceCategoriesQuery() {
  return useQuery({
    queryKey: placeCategoriesQueryKey(),
    queryFn: () => getPlaceCategories(),
  });
}

export function usePlacesQuery() {
  return useQuery({
    queryKey: placesQueryKey(),
    queryFn: () => getPlaces(),
  });
}
