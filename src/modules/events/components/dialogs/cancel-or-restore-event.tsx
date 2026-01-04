import { Eraser, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Event } from "@/db/types/events";
import { cancelOrRestoreEvent } from "@/modules/events/server-actions";

export function CancelOrRestoreEvent({ event }: { event: Event }) {
  return (
    <form
      action={cancelOrRestoreEvent}
      className="ml-auto flex items-center gap-1"
    >
      <input type="hidden" name="id" value={event.id} />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button type="submit" variant="outline" size="icon">
            {event.isCanceled && <RotateCw />}
            {!event.isCanceled && <Eraser />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {event.isCanceled ? "Restore" : "Cancel"}
        </TooltipContent>
      </Tooltip>
    </form>
  );
}
