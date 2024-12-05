import { usePaginatedQuery } from "@/common/hooks/use-paginated-query";
import {
  placeCategoriesGetAll,
  placesGetAll,
  placesGetPaginated,
} from "@/modules/places/places-actions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function usePlaceCategoriesQuery() {
  return useQuery({
    queryKey: ["place-categories"],
    queryFn: () => placeCategoriesGetAll(),
  });
}

export function usePlacesPaginatedQuery() {
  return usePaginatedQuery({
    queryKey: ["places"],
    queryFn: (paginate) => placesGetPaginated(paginate),
    placeholderData: keepPreviousData,
  });
}

export function usePlacesGetAllQuery() {
  return useQuery({
    queryKey: ["places"],
    queryFn: () => placesGetAll(),
  });
}
