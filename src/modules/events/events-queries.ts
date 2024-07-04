import { getEvents } from "@/modules/events/events-actions";
import { useQuery } from "@tanstack/react-query";

export function useEventsQuery() {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => getEvents(),
  });
}
