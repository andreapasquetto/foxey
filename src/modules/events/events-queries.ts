import { eventCategoriesGetAll, eventsGetAll } from "@/modules/events/events-actions";
import { useQuery } from "@tanstack/react-query";

export function useEventCategoriesGetAllQuery() {
  return useQuery({
    queryKey: ["event-categories"],
    queryFn: () => eventCategoriesGetAll(),
  });
}

export function useEventsGetAllQuery() {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => eventsGetAll(),
  });
}
