import { carsQueryKey, refuelingsQueryKey } from "@/common/query-keys";
import { createCar, createRefueling } from "@/modules/cars/cars-actions";
import { CarCreateForm } from "@/modules/cars/schemas/car-create-form-schema";
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
