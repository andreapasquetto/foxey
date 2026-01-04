import { useMutation } from "@tanstack/react-query";
import { createEvent } from "@/modules/events/server-actions";

export function useCreateEventMutation() {
  return useMutation({
    mutationKey: ["events", "create"],
    mutationFn: createEvent,
  });
}
