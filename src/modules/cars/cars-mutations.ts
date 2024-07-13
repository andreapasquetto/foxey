import { carsQueryKey, highwayTripsQueryKey, refuelingsQueryKey } from "@/common/query-keys";
import { createCar, createHighwayTrip, createRefueling } from "@/modules/cars/cars-actions";
import { CarCreateForm } from "@/modules/cars/schemas/car-create-form-schema";
import { HighwayTripCreateForm } from "@/modules/cars/schemas/highway-trip-create-form-schema";
import { RefuelingCreateForm } from "@/modules/cars/schemas/refueling-create-form-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCarMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: carsQueryKey(),
    mutationFn: (car: CarCreateForm) => createCar(car),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: carsQueryKey() }),
  });
}

export function useCreateRefuelingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: refuelingsQueryKey(),
    mutationFn: (refueling: RefuelingCreateForm) => createRefueling(refueling),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: refuelingsQueryKey() }),
  });
}

export function useCreateHighwayTripMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: highwayTripsQueryKey(),
    mutationFn: (trip: HighwayTripCreateForm) => createHighwayTrip(trip),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: highwayTripsQueryKey() }),
  });
}
