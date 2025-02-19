import { usePaginatedQuery } from "@/common/hooks/use-paginated-query";
import {
  placeCategoriesGetAll,
  placeCategoriesGetPaginated,
  placesGetAll,
  placesGetById,
  placesGetPaginated,
} from "@/modules/places/places-actions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function usePlaceCategoriesGetAllQuery() {
  return useQuery({
    queryKey: ["place-categories"],
    queryFn: () => placeCategoriesGetAll(),
  });
}

export function usePlaceCategoriesGetPaginatedQuery(params: { searchFilter?: string }) {
  return usePaginatedQuery({
    queryKey: ["place-categories", { ...params }],
    queryFn: (paginate) =>
      placeCategoriesGetPaginated({
        paginate,
        searchFilter: params.searchFilter,
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

export function usePlacesGetPaginatedQuery(
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

export function usePlacesGetByIdQuery(id: string) {
  return useQuery({
    queryKey: ["places", id],
    queryFn: () => placesGetById(id),
  });
}
