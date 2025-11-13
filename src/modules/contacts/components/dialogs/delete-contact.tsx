"use client";

import { Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Contact } from "@/db/types/contacts";
import { contactsDelete } from "@/modules/contacts/contacts-actions";

export function DeleteContact(props: { contact: Contact }) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <Button
        variant="ghost"
        className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 px-2 py-1.5 sm:h-10"
        onClick={() => setShowDialog(true)}
      >
        Delete <Trash className="size-5 text-destructive" />
      </Button>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Delete contact</DialogTitle>
          <DialogDescription>{props.contact.fullName}</DialogDescription>
        </DialogHeader>
        <p className="text-center sm:text-left">
          Are you sure you want to delete this contact and all of its phone
          numbers, emails and addresses?
        </p>
        <form
          action={contactsDelete}
          className="flex items-center justify-center gap-3"
        >
          <input type="hidden" name="id" value={props.contact.id} />
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowDialog(false)}
          >
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
