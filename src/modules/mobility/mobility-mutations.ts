import {
  carsCreate,
  highwayTripsCreate,
  inspectionsCreate,
  refuelingsCreate,
  servicesCreate,
} from "@/modules/mobility/mobility-actions";
import { CarCreateForm } from "@/modules/mobility/schemas/car-create-form-schema";
import { HighwayTripCreateForm } from "@/modules/mobility/schemas/highway-trip-create-form-schema";
import { InspectionCreateForm } from "@/modules/mobility/schemas/inspection-create-form-schema";
import { RefuelingCreateForm } from "@/modules/mobility/schemas/refueling-create-form-schema";
import { ServiceCreateForm } from "@/modules/mobility/schemas/service-create-form-schema";
import { useMutation } from "@tanstack/react-query";

export function useCarsCreateMutation() {
  return useMutation({
    mutationFn: (car: CarCreateForm) => carsCreate(car),
  });
}

export function useRefuelingsCreateMutation(carId: string) {
  return useMutation({
    mutationKey: ["refuelings", "create"],
    mutationFn: (refueling: RefuelingCreateForm) => refuelingsCreate({ carId, refueling }),
  });
}

export function useHighwayTripsCreateMutation(carId: string) {
  return useMutation({
    mutationKey: ["highway-trips", "create"],
    mutationFn: (trip: HighwayTripCreateForm) =>
      highwayTripsCreate({
        carId,
        trip,
      }),
  });
}

export function useServicesCreateMutation(carId: string) {
  return useMutation({
    mutationKey: ["services", "create"],
    mutationFn: (service: ServiceCreateForm) =>
      servicesCreate({
        carId,
        service,
      }),
  });
}

export function useInspectionsCreateMutation(carId: string) {
  return useMutation({
    mutationKey: ["inspections", "create"],
    mutationFn: (inspection: InspectionCreateForm) => inspectionsCreate({ carId, inspection }),
  });
}
