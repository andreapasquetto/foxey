import { Archive } from "lucide-react";
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
import { archiveContact } from "@/modules/contacts/server-actions";

export function ArchiveContact({ contact }: { contact: Contact }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full cursor-pointer items-center justify-between"
        >
          Archive <Archive />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Archive contact</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to archive this contact?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <form
            action={archiveContact}
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
