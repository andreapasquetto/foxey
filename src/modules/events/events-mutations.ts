import { useMutation } from "@tanstack/react-query";
import { eventsCreate } from "@/modules/events/events-actions";
import type { CreateEventFormType } from "@/modules/events/schemas/create-event-form-schema";

export function useEventsCreateMutation() {
  return useMutation({
    mutationKey: ["events", "create"],
    mutationFn: (event: CreateEventFormType) => eventsCreate(event),
  });
}
