import {
  carsCreate,
  highwayTripsCreate,
  inspectionsCreate,
  refuelingsCreate,
  servicesCreate,
} from "@/modules/mobility/mobility-actions";
import { CreateCarFormType } from "@/modules/mobility/schemas/create-car-form-schema";
import { CreateHighwayTripFormType } from "@/modules/mobility/schemas/create-highway-trip-form-schema";
import { CreateInspectionFormType } from "@/modules/mobility/schemas/create-inspection-form-schema";
import { CreateRefuelingFormType } from "@/modules/mobility/schemas/create-refueling-form-schema";
import { CreateServiceFormType } from "@/modules/mobility/schemas/create-service-form-schema";
import { useMutation } from "@tanstack/react-query";

export function useCarsCreateMutation() {
  return useMutation({
    mutationFn: (car: CreateCarFormType) => carsCreate(car),
  });
}

export function useRefuelingsCreateMutation(carId: string) {
  return useMutation({
    mutationKey: ["refuelings", "create"],
    mutationFn: (refueling: CreateRefuelingFormType) => refuelingsCreate({ carId, refueling }),
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
    mutationFn: (inspection: CreateInspectionFormType) => inspectionsCreate({ carId, inspection }),
  });
}
