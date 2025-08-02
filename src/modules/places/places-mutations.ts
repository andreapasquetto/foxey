import { placesCreate, placesUpdate } from "@/modules/places/places-actions";
import { PlaceCreateForm } from "@/modules/places/schemas/place-create-form-schema";
import { PlaceUpdateForm } from "@/modules/places/schemas/place-update-form-schema";
import { useMutation } from "@tanstack/react-query";

export function usePlacesCreateMutation() {
  return useMutation({
    mutationKey: ["places", "create"],
    mutationFn: (place: PlaceCreateForm) => placesCreate(place),
  });
}

export function usePlacesUpdateMutation(id: string) {
  return useMutation({
    mutationKey: ["places", id, "update"],
    mutationFn: (place: PlaceUpdateForm) => placesUpdate(place),
  });
}
