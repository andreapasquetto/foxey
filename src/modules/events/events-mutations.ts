import { eventsCreate } from "@/modules/events/events-actions";
import { CreateEventFormType } from "@/modules/events/schemas/create-event-form-schema";
import { useMutation } from "@tanstack/react-query";

export function useEventsCreateMutation() {
  return useMutation({
    mutationKey: ["events", "create"],
    mutationFn: (event: CreateEventFormType) => eventsCreate(event),
  });
}
