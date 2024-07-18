"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ContactCreateForm } from "@/modules/contacts/components/contact-create-form";
import { useState } from "react";

export function CreateContact() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <Button size="sm" onClick={() => setShowDialog(true)}>
        Create contact
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create contact</DialogTitle>
        </DialogHeader>
        <ContactCreateForm onSubmit={() => setShowDialog(false)} />
      </DialogContent>
    </Dialog>
  );
}
