import { getPlaces } from "@/modules/places/places-actions";
import { useQuery } from "@tanstack/react-query";

export function usePlacesQuery() {
  return useQuery({
    queryKey: ["places"],
    queryFn: () => getPlaces(),
  });
}
