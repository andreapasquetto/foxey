import { placesCreate, placesUpdate } from "@/modules/places/places-actions";
import { CreatePlaceFormType } from "@/modules/places/schemas/create-place-form-schema";
import { UpdatePlaceFormType } from "@/modules/places/schemas/update-place-form-schema";
import { useMutation } from "@tanstack/react-query";

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
