import { carsQueryKey } from "@/common/query-keys";
import { createCar } from "@/modules/cars/cars-actions";
import { CarCreateForm } from "@/modules/cars/schemas/car-create-form-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCarMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: carsQueryKey(),
    mutationFn: (car: CarCreateForm) => createCar(car),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: carsQueryKey() }),
  });
}
