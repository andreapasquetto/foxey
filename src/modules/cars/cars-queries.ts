import { getCars } from "@/modules/cars/cars-actions";
import { useQuery } from "@tanstack/react-query";

export function useCarsQuery() {
  return useQuery({
    queryKey: ["cars"],
    queryFn: () => getCars(),
  });
}
