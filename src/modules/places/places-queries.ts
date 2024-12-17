import { usePaginatedQuery } from "@/common/hooks/use-paginated-query";
import {
  placeCategoriesGetAll,
  placeGetById,
  placesGetAll,
  placesGetPaginated,
} from "@/modules/places/places-actions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function usePlaceCategoriesGetAllQuery() {
  return useQuery({
    queryKey: ["place-categories"],
    queryFn: () => placeCategoriesGetAll(),
  });
}

export function usePlacesPaginatedQuery(
  params: { searchFilter?: string; categoryId?: string; onlyVisited?: boolean } = {},
) {
  return usePaginatedQuery({
    queryKey: ["places", { ...params }],
    queryFn: (paginate) =>
      placesGetPaginated({
        paginate,
        searchFilter: params.searchFilter,
        categoryId: params.categoryId,
        onlyVisited: params.onlyVisited,
      }),
    placeholderData: keepPreviousData,
  });
}

export function usePlacesGetAllQuery() {
  return useQuery({
    queryKey: ["places"],
    queryFn: () => placesGetAll(),
  });
}

export function usePlaceGetByIdQuery(id: string) {
  return useQuery({
    queryKey: ["places", id],
    queryFn: () => placeGetById(id)
  })
}
