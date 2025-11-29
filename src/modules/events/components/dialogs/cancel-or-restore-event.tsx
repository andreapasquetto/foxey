import { Eraser, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Event } from "@/db/types/events";
import { eventsToggleCancel } from "@/modules/events/events-actions";

export function CancelOrRestoreEvent({ event }: { event: Event }) {
  return (
    <form
      action={eventsToggleCancel}
      className="ml-auto flex items-center gap-1"
    >
      <input type="hidden" name="id" value={event.id} />
      <Button type="submit" variant="outline" size="icon">
        {event.isCanceled && <RotateCw className="size-4" />}
        {!event.isCanceled && <Eraser className="size-4" />}
      </Button>
    </form>
  );
}
