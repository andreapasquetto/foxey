import { useMutation } from "@tanstack/react-query";
import { placesCreate, placesUpdate } from "@/modules/places/places-actions";

export function usePlacesCreateMutation() {
  return useMutation({
    mutationKey: ["places", "create"],
    mutationFn: placesCreate,
  });
}

export function usePlacesUpdateMutation() {
  return useMutation({
    mutationKey: ["places", "update"],
    mutationFn: placesUpdate,
  });
}
