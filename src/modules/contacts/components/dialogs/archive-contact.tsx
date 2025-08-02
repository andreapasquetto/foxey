"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Contact } from "@/db/types/contacts";
import { contactsArchive } from "@/modules/contacts/contacts-actions";
import { Archive } from "lucide-react";
import { useState } from "react";

export function ArchiveContact(props: { contact: Contact }) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <Button
        variant="ghost"
        className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 px-2 py-1.5 sm:h-10"
        onClick={() => setShowDialog(true)}
      >
        Archive <Archive className="h-5 w-5" />
      </Button>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Archive contact</DialogTitle>
          <DialogDescription>{props.contact.fullName}</DialogDescription>
        </DialogHeader>
        <p className="text-center sm:text-left">Are you sure you want to archive this contact?</p>
        <form action={contactsArchive} className="flex items-center justify-center gap-3">
          <input type="hidden" name="id" value={props.contact.id} />
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
