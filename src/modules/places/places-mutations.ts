import { placeCreate, placeDelete, placeUpdate } from "@/modules/places/places-actions";
import { PlaceCreateForm } from "@/modules/places/schemas/place-create-form-schema";
import { PlaceUpdateForm } from "@/modules/places/schemas/place-update-form-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePlaceCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["places", "create"],
    mutationFn: (place: PlaceCreateForm) => placeCreate(place),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });
}

export function usePlaceUpdateMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["places", id, "update"],
    mutationFn: (place: PlaceUpdateForm) => placeUpdate(place),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });
}

export function usePlaceDeleteMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["places", id, "delete"],
    mutationFn: (id: string) => placeDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });
}
