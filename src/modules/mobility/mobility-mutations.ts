import {
  carCreate,
  highwayTripCreate,
  inspectionsCreate,
  refuelingCreate,
} from "@/modules/mobility/mobility-actions";
import { CarCreateForm } from "@/modules/mobility/schemas/car-create-form-schema";
import { HighwayTripCreateForm } from "@/modules/mobility/schemas/highway-trip-create-form-schema";
import { InspectionCreateForm } from "@/modules/mobility/schemas/inspection-create-form-schema";
import { RefuelingCreateForm } from "@/modules/mobility/schemas/refueling-create-form-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCarCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["cars", "create"],
    mutationFn: (car: CarCreateForm) => carCreate(car),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
}

export function useRefuelingCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["refuelings", "create"],
    mutationFn: (refueling: RefuelingCreateForm) => refuelingCreate(refueling),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["refuelings"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}

export function useHighwayTripCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["highway-trips", "create"],
    mutationFn: (trip: HighwayTripCreateForm) => highwayTripCreate(trip),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highway-trips"] });
    },
  });
}

export function useInspectionsCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["inspections", "create"],
    mutationFn: (inspection: InspectionCreateForm) => inspectionsCreate(inspection),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inspections"] });
    },
  });
}
