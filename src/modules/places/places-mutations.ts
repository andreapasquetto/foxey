import { placesCreate, placesDelete, placesUpdate } from "@/modules/places/places-actions";
import { PlaceCreateForm } from "@/modules/places/schemas/place-create-form-schema";
import { PlaceUpdateForm } from "@/modules/places/schemas/place-update-form-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePlacesCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["places", "create"],
    mutationFn: (place: PlaceCreateForm) => placesCreate(place),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });
}

export function usePlacesUpdateMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["places", id, "update"],
    mutationFn: (place: PlaceUpdateForm) => placesUpdate(place),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });
}

export function usePlacesDeleteMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["places", id, "delete"],
    mutationFn: (id: string) => placesDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });
}
