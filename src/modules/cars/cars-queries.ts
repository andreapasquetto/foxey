import { usePaginatedQuery } from "@/common/hooks/use-paginated-query";
import { carsQueryKey, refuelingsQueryKey } from "@/common/query-keys";
import { getCars, getHighwayTrips, refuelingsGetPaginated } from "@/modules/cars/cars-actions";
import { useQuery } from "@tanstack/react-query";

export function useCarsQuery() {
  return useQuery({
    queryKey: carsQueryKey(),
    queryFn: () => getCars(),
  });
}

export function useRefuelingsPaginatedQuery(carId: string | undefined) {
  return usePaginatedQuery({
    queryKey: refuelingsQueryKey(carId),
    queryFn: (paginate) => refuelingsGetPaginated({ paginate, carId }),
  });
}

export function useHighwayTripsQuery() {
  return useQuery({
    queryKey: ["highway-trips"],
    queryFn: () => getHighwayTrips(),
  });
}
