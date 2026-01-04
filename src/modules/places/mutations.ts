import { useMutation } from "@tanstack/react-query";
import { createPlace, updatePlace } from "@/modules/places/server-actions";

export function usePlacesCreateMutation() {
  return useMutation({
    mutationKey: ["places", "create"],
    mutationFn: createPlace,
  });
}

export function usePlacesUpdateMutation() {
  return useMutation({
    mutationKey: ["places", "update"],
    mutationFn: updatePlace,
  });
}
