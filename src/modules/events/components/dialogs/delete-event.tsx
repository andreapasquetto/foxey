import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Event } from "@/db/types/events";
import { eventsDelete } from "@/modules/events/events-actions";
import { format } from "date-fns";
import { Trash } from "lucide-react";
import { useState } from "react";

export function DeleteEvent(props: { event: Event }) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <Button variant="outline" size="icon" onClick={() => setShowDialog(true)}>
        <Trash className="h-4 w-4 text-destructive" />
      </Button>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Delete event</DialogTitle>
          <DialogDescription>
            <code>{format(props.event.datetime, "ccc y-MM-dd HH:mm")}</code>
          </DialogDescription>
        </DialogHeader>
        <p className="text-center sm:text-left">Are you sure you want to delete this event?</p>
        <form action={eventsDelete} className="flex items-center justify-center gap-3">
          <input type="hidden" name="id" value={props.event.id} />
          <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={() => setShowDialog(false)}>
            Confirm
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
