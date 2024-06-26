import { getCars, getRefuelings } from "@/modules/cars/cars-actions";
import { useQuery } from "@tanstack/react-query";

export function useCarsQuery() {
  return useQuery({
    queryKey: ["cars"],
    queryFn: () => getCars(),
  });
}

export function useRefuelingsQuery() {
  return useQuery({
    queryKey: ["refuelings"],
    queryFn: () => getRefuelings(),
  });
}
