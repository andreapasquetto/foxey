import { CircularSpinner } from "@/components/circular-spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Contact } from "@/db/types/contacts";
import { useContactsUnarchiveMutation } from "@/modules/contacts/contacts-mutations";
import { ArchiveRestore } from "lucide-react";
import { useState } from "react";

interface UnarchiveContactProps {
  contact: Contact;
}

export function UnarchiveContact(props: UnarchiveContactProps) {
  const [showDialog, setShowDialog] = useState(false);

  const mutation = useContactsUnarchiveMutation(props.contact.id);

  function unarchiveAndCloseDialog() {
    mutation.mutate(props.contact.id, {
      onSuccess: () => setShowDialog(false),
    });
  }

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <Button
        variant="ghost"
        className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 px-2 py-1.5 sm:h-10"
        onClick={() => setShowDialog(true)}
      >
        Unarchive <ArchiveRestore className="h-5 w-5" />
      </Button>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Unarchive contact</DialogTitle>
          <DialogDescription>{props.contact.fullName}</DialogDescription>
        </DialogHeader>
        <p className="text-center sm:text-left">Are you sure you want to unarchive this contact?</p>
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => setShowDialog(false)}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
          <Button onClick={() => unarchiveAndCloseDialog()} disabled={mutation.isPending}>
            Confirm
          </Button>
          {mutation.isPending && <CircularSpinner />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
