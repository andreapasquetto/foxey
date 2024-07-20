"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PlaceCreateForm } from "@/modules/places/components/place-create-form";
import { useState } from "react";

export function AddPlace() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <Button size="sm" onClick={() => setShowDialog(true)}>
        Add place
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add place</DialogTitle>
        </DialogHeader>
        <PlaceCreateForm onSubmit={() => setShowDialog(false)} />
      </DialogContent>
    </Dialog>
  );
}
