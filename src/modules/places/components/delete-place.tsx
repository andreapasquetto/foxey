import { CircularSpinner } from "@/components/circular-spinner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDeletePlaceMutation } from "@/modules/places/places-mutations";
import { PlaceRead } from "@/modules/places/schemas/place-read-schema";
import { Trash } from "lucide-react";
import { useState } from "react";

interface DeletePlaceProps {
  place: PlaceRead;
}

export function DeletePlace(props: DeletePlaceProps) {
  const [showDialog, setShowDialog] = useState(false);

  const mutation = useDeletePlaceMutation(props.place.id);

  function deleteAndCloseDialog() {
    mutation.mutate(props.place.id, {
      onSuccess: () => setShowDialog(false),
    });
  }

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <Button size="icon" variant="destructive" onClick={() => setShowDialog(true)}>
        <Trash className="h-5 w-5" />
      </Button>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Delete &quot;{props.place.name}&quot;</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this place?</p>
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
