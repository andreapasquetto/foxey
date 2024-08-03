"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ContactCreateForm } from "@/modules/contacts/components/contact-create-form";
import { Plus } from "lucide-react";
import { useState } from "react";

export function CreateContact() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <Button className="hidden sm:inline-flex" size="sm" onClick={() => setShowDialog(true)}>
        Create contact
      </Button>
      <Button className="sm:hidden" size="icon" onClick={() => setShowDialog(true)}>
        <Plus className="h-5 w-5" />
      </Button>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Create contact</DialogTitle>
        </DialogHeader>
        <ContactCreateForm onSubmit={() => setShowDialog(false)} />
      </DialogContent>
    </Dialog>
  );
}
