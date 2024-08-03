"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PlaceCreateForm } from "@/modules/places/components/place-create-form";
import { Plus } from "lucide-react";
import { useState } from "react";

export function AddPlace() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <Button className="hidden sm:inline-flex" size="sm" onClick={() => setShowDialog(true)}>
        Add place
      </Button>
      <Button className="sm:hidden" size="icon" onClick={() => setShowDialog(true)}>
        <Plus className="h-5 w-5" />
      </Button>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add place</DialogTitle>
        </DialogHeader>
        <PlaceCreateForm onSubmit={() => setShowDialog(false)} />
      </DialogContent>
    </Dialog>
  );
}
