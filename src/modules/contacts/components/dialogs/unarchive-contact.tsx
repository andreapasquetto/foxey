import { ArchiveRestore } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { Contact } from "@/db/types/contacts";
import { unarchiveContact } from "@/modules/contacts/server-actions";

export function UnarchiveContact({ contact }: { contact: Contact }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full cursor-pointer items-center justify-between"
        >
          Unarchive <ArchiveRestore />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unarchive contact</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to unarchive this contact?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <form
            action={unarchiveContact}
            className="flex items-center justify-center gap-3"
          >
            <input type="hidden" name="id" value={contact.id} />
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button type="submit">Confirm</Button>
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
