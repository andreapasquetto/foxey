import { eventsGetAll } from "@/modules/events/events-actions";
import { useQuery } from "@tanstack/react-query";

export function useEventsGetAllQuery() {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => eventsGetAll(),
  });
}
