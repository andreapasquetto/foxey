import { eventsCreate } from "@/modules/events/events-actions";
import { EventCreateForm } from "@/modules/events/schemas/event-create-form-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEventsCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["events", "create"],
    mutationFn: (event: EventCreateForm) => eventsCreate(event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}
