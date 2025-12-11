import { useMutation } from "@tanstack/react-query";
import {
  carsCreate,
  highwayTripsCreate,
  inspectionsCreate,
  refuelingsCreate,
  servicesCreate,
} from "@/modules/mobility/mobility-actions";
import type { CreateHighwayTripFormType } from "@/modules/mobility/schemas/create-highway-trip-form-schema";
import type { CreateInspectionFormType } from "@/modules/mobility/schemas/create-inspection-form-schema";
import type { CreateRefuelingFormType } from "@/modules/mobility/schemas/create-refueling-form-schema";
import type { CreateServiceFormType } from "@/modules/mobility/schemas/create-service-form-schema";

export function useCarsCreateMutation() {
  return useMutation({
    mutationKey: ["cars", "create"],
    mutationFn: carsCreate,
  });
}

export function useRefuelingsCreateMutation(carId: string) {
  return useMutation({
    mutationKey: ["refuelings", "create"],
    mutationFn: (refueling: CreateRefuelingFormType) =>
      refuelingsCreate({ carId, refueling }),
  });
}

export function useHighwayTripsCreateMutation(carId: string) {
  return useMutation({
    mutationKey: ["highway-trips", "create"],
    mutationFn: (trip: CreateHighwayTripFormType) =>
      highwayTripsCreate({
        carId,
        trip,
      }),
  });
}

export function useServicesCreateMutation(carId: string) {
  return useMutation({
    mutationKey: ["services", "create"],
    mutationFn: (service: CreateServiceFormType) =>
      servicesCreate({
        carId,
        service,
      }),
  });
}

export function useInspectionsCreateMutation(carId: string) {
  return useMutation({
    mutationKey: ["inspections", "create"],
    mutationFn: (inspection: CreateInspectionFormType) =>
      inspectionsCreate({ carId, inspection }),
  });
}
