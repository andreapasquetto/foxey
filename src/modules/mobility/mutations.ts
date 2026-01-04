import { useMutation } from "@tanstack/react-query";
import type { CreateHighwayTripFormType } from "@/modules/mobility/schemas/create-highway-trip-form-schema";
import type { CreateInspectionFormType } from "@/modules/mobility/schemas/create-inspection-form-schema";
import type { CreateRefuelingFormType } from "@/modules/mobility/schemas/create-refueling-form-schema";
import type { CreateServiceFormType } from "@/modules/mobility/schemas/create-service-form-schema";
import {
  createCar,
  createHighwayTrip,
  createInspection,
  createRefueling,
  createService,
} from "@/modules/mobility/server-actions";

export function useCreateCarMutation() {
  return useMutation({
    mutationKey: ["mobility", "cars", "create"],
    mutationFn: createCar,
  });
}

export function useCreateRefuelingMutation(carId: string) {
  return useMutation({
    mutationKey: ["mobility", "refuelings", "create"],
    mutationFn: (refueling: CreateRefuelingFormType) =>
      createRefueling({ carId, refueling }),
  });
}

export function useCreateHighwayTripMutation(carId: string) {
  return useMutation({
    mutationKey: ["mobility", "highway-trips", "create"],
    mutationFn: (trip: CreateHighwayTripFormType) =>
      createHighwayTrip({
        carId,
        trip,
      }),
  });
}

export function useCreateServiceMutation(carId: string) {
  return useMutation({
    mutationKey: ["mobility", "services", "create"],
    mutationFn: (service: CreateServiceFormType) =>
      createService({
        carId,
        service,
      }),
  });
}

export function useCreateInspectionMutation(carId: string) {
  return useMutation({
    mutationKey: ["mobility", "inspections", "create"],
    mutationFn: (inspection: CreateInspectionFormType) =>
      createInspection({ carId, inspection }),
  });
}
