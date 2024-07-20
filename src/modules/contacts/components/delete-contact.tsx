import { CircularSpinner } from "@/components/circular-spinner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDeleteContactMutation } from "@/modules/contacts/contacts-mutations";
import { ContactRead } from "@/modules/contacts/schemas/contact-read-schema";
import { Trash } from "lucide-react";
import { useState } from "react";

interface DeleteContactProps {
  contact: ContactRead;
}

export function DeleteContact(props: DeleteContactProps) {
  const [showDialog, setShowDialog] = useState(false);

  const mutation = useDeleteContactMutation(props.contact.id);

  function deleteAndCloseDialog() {
    mutation.mutate(props.contact.id, {
      onSuccess: () => setShowDialog(false),
    });
  }

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <Button size="icon" variant="destructive" onClick={() => setShowDialog(true)}>
        <Trash className="h-5 w-5" />
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete &quot;{props.contact.fullName}&quot;</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to delete this contact and all of its phone numbers, emails and
          addresses?
        </p>
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
