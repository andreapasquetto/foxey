import { eventsCreate } from "@/modules/events/events-actions";
import { EventCreateForm } from "@/modules/events/schemas/event-create-form-schema";
import { useMutation } from "@tanstack/react-query";

export function useEventsCreateMutation() {
  return useMutation({
    mutationKey: ["events", "create"],
    mutationFn: (event: EventCreateForm) => eventsCreate(event),
  });
}
