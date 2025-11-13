import { useMutation } from "@tanstack/react-query";
import { placesCreate, placesUpdate } from "@/modules/places/places-actions";
import type { CreatePlaceFormType } from "@/modules/places/schemas/create-place-form-schema";
import type { UpdatePlaceFormType } from "@/modules/places/schemas/update-place-form-schema";

export function usePlacesCreateMutation() {
  return useMutation({
    mutationKey: ["places", "create"],
    mutationFn: (place: CreatePlaceFormType) => placesCreate(place),
  });
}

export function usePlacesUpdateMutation() {
  return useMutation({
    mutationKey: ["places", "update"],
    mutationFn: (place: UpdatePlaceFormType) => placesUpdate(place),
  });
}
