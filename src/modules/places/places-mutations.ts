import { placesQueryKey } from "@/common/query-keys";
import { createPlace } from "@/modules/places/places-actions";
import { PlaceCreateForm } from "@/modules/places/schemas/place-create-form-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePlaceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: placesQueryKey(),
    mutationFn: (place: PlaceCreateForm) => createPlace(place),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: placesQueryKey() }),
  });
}
