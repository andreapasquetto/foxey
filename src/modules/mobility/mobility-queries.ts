import { usePaginatedQuery } from "@/common/hooks/use-paginated-query";
import {
  carsQueryKey,
  highwayTripsQueryKey,
  refuelingsQueryKey,
  servicesQueryKey,
} from "@/common/query-keys";
import {
  carsGetAll,
  highwayTripsGetPaginated,
  refuelingsGetAll,
  refuelingsGetPaginated,
  servicesGetAll,
  servicesGetPaginated,
} from "@/modules/mobility/mobility-actions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useCarsGetAllQuery() {
  return useQuery({
    queryKey: carsQueryKey(),
    queryFn: () => carsGetAll(),
  });
}

export function useRefuelingsGetAllQuery(carId?: string) {
  return useQuery({
    queryKey: refuelingsQueryKey(carId),
    queryFn: () => refuelingsGetAll(carId),
  });
}

export function useRefuelingsGetPaginatedQuery(carId?: string) {
  return usePaginatedQuery({
    queryKey: refuelingsQueryKey(carId),
    queryFn: (paginate) => refuelingsGetPaginated({ paginate, carId }),
    placeholderData: keepPreviousData,
  });
}

export function useServicesGetAllQuery(carId?: string) {
  return useQuery({
    queryKey: servicesQueryKey(carId),
    queryFn: () => servicesGetAll(carId),
  });
}

export function useServicesGetPaginatedQuery(carId?: string) {
  return usePaginatedQuery({
    queryKey: servicesQueryKey(carId),
    queryFn: (paginate) => servicesGetPaginated({ paginate, carId }),
    placeholderData: keepPreviousData,
  });
}

export function useHighwayTripsGetPaginatedQuery(carId?: string) {
  return usePaginatedQuery({
    queryKey: highwayTripsQueryKey(carId),
    queryFn: (paginate) => highwayTripsGetPaginated({ paginate, carId }),
    placeholderData: keepPreviousData,
  });
}
