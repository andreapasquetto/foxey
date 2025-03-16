import { CircularSpinner } from "@/components/circular-spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Event } from "@/db/types/events";
import { useEventsDeleteMutation } from "@/modules/events/events-mutations";
import { format } from "date-fns";
import { Trash } from "lucide-react";
import { useState } from "react";

interface DeleteEventDialogProps {
  event: Event;
}

export function DeleteEventDialog(props: DeleteEventDialogProps) {
  const [showDialog, setShowDialog] = useState(false);

  const mutation = useEventsDeleteMutation();

  function deleteAndCloseDialog() {
    mutation.mutate(props.event.id, {
      onSuccess: () => setShowDialog(false),
    });
  }

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
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => setShowDialog(false)}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
          <Button onClick={() => deleteAndCloseDialog()} disabled={mutation.isPending}>
            Confirm
          </Button>
          {mutation.isPending && <CircularSpinner />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
