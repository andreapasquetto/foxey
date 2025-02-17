import { usePaginatedQuery } from "@/common/hooks/use-paginated-query";
import {
  carsGetAll,
  carsGetById,
  highwayTripsGetPaginated,
  inspectionsGetAll,
  inspectionsGetPaginated,
  refuelingsGetAll,
  refuelingsGetPaginated,
  servicesGetAll,
  servicesGetPaginated,
} from "@/modules/mobility/mobility-actions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useCarsGetAllQuery() {
  return useQuery({
    queryKey: ["cars"],
    queryFn: () => carsGetAll(),
  });
}

export function useCarsGetByIdQuery(id: string) {
  return useQuery({
    queryKey: ["cars", { id }],
    queryFn: () => carsGetById(id),
  });
}

export function useRefuelingsGetAllQuery(carId: string) {
  return useQuery({
    queryKey: ["refuelings", { carId }],
    queryFn: () => refuelingsGetAll(carId),
  });
}

export function useRefuelingsGetPaginatedQuery(carId: string) {
  return usePaginatedQuery({
    queryKey: ["refuelings", { carId }],
    queryFn: (paginate) => refuelingsGetPaginated({ paginate, carId }),
    placeholderData: keepPreviousData,
  });
}

export function useHighwayTripsGetPaginatedQuery(carId: string) {
  return usePaginatedQuery({
    queryKey: ["highway-trips", { carId }],
    queryFn: (paginate) => highwayTripsGetPaginated({ paginate, carId }),
    placeholderData: keepPreviousData,
  });
}

export function useServicesGetAllQuery(carId: string) {
  return useQuery({
    queryKey: ["services", { carId }],
    queryFn: () => servicesGetAll(carId),
  });
}

export function useServicesGetPaginatedQuery(carId: string) {
  return usePaginatedQuery({
    queryKey: ["services", { carId }],
    queryFn: (paginate) => servicesGetPaginated({ paginate, carId }),
    placeholderData: keepPreviousData,
  });
}

export function useInspectionsGetAllQuery(carId: string) {
  return useQuery({
    queryKey: ["inspections", { carId }],
    queryFn: () => inspectionsGetAll(carId),
  });
}

export function useInspectionsGetPaginatedQuery(carId: string) {
  return usePaginatedQuery({
    queryKey: ["inspections", { carId }],
    queryFn: (paginate) => inspectionsGetPaginated({ paginate, carId }),
    placeholderData: keepPreviousData,
  });
}
