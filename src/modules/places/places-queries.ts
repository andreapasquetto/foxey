import { usePaginatedQuery } from "@/common/hooks/use-paginated-query";
import { placeCategoriesQueryKey, placesQueryKey } from "@/common/query-keys";
import { getPlaceCategories, placesGetPaginated } from "@/modules/places/places-actions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function usePlaceCategoriesQuery() {
  return useQuery({
    queryKey: placeCategoriesQueryKey(),
    queryFn: () => getPlaceCategories(),
  });
}

export function usePlacesPaginatedQuery() {
  return usePaginatedQuery({
    queryKey: placesQueryKey(),
    queryFn: (paginate) => placesGetPaginated(paginate),
    placeholderData: keepPreviousData,
  });
}
