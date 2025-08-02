import { placesGetAll } from "@/modules/places/places-actions";
import { useQuery } from "@tanstack/react-query";

export function usePlacesGetAllQuery() {
  return useQuery({
    queryKey: ["places"],
    queryFn: () => placesGetAll(),
  });
}
