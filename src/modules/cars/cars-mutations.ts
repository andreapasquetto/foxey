import { carsQueryKey, highwayTripsQueryKey, refuelingsQueryKey } from "@/common/query-keys";
import { carCreate, highwayTripCreate, refuelingCreate } from "@/modules/cars/cars-actions";
import { CarCreateForm } from "@/modules/cars/schemas/car-create-form-schema";
import { HighwayTripCreateForm } from "@/modules/cars/schemas/highway-trip-create-form-schema";
import { RefuelingCreateForm } from "@/modules/cars/schemas/refueling-create-form-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCarCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: carsQueryKey(),
    mutationFn: (car: CarCreateForm) => carCreate(car),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: carsQueryKey() }),
  });
}

export function useRefuelingCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: refuelingsQueryKey(),
    mutationFn: (refueling: RefuelingCreateForm) => refuelingCreate(refueling),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: refuelingsQueryKey() }),
  });
}

export function useHighwayTripCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: highwayTripsQueryKey(),
    mutationFn: (trip: HighwayTripCreateForm) => highwayTripCreate(trip),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: highwayTripsQueryKey() }),
  });
}
