import { useMutation } from "@tanstack/react-query";
import { eventsCreate } from "@/modules/events/events-actions";

export function useEventsCreateMutation() {
  return useMutation({
    mutationKey: ["events", "create"],
    mutationFn: eventsCreate,
  });
}
