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
} from "@/modules/cars/cars-actions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useCarsQuery() {
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

export function useServicesGetAllQuery(carId?: string) {
  return useQuery({
    queryKey: servicesQueryKey(carId),
    queryFn: () => servicesGetAll(carId),
  });
}

export function useRefuelingsPaginatedQuery(carId?: string) {
  return usePaginatedQuery({
    queryKey: refuelingsQueryKey(carId),
    queryFn: (paginate) => refuelingsGetPaginated({ paginate, carId }),
    placeholderData: keepPreviousData,
  });
}

export function useHighwayTripsPaginatedQuery(carId?: string) {
  return usePaginatedQuery({
    queryKey: highwayTripsQueryKey(carId),
    queryFn: (paginate) => highwayTripsGetPaginated({ paginate, carId }),
    placeholderData: keepPreviousData,
  });
}
