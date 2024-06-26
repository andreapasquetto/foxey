import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RefuelingCreateForm } from "@/modules/cars/components/forms/refueling-create-form";
import { CarRead } from "@/modules/cars/schemas/car-read-schema";
import { useState } from "react";

interface AddRefuelingProps {
  selectedCar: CarRead;
}

export function AddRefueling(props: AddRefuelingProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <Button size="sm" onClick={() => setShowDialog(true)}>
        Add refueling
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add refueling</DialogTitle>
          <DialogDescription>
            {props.selectedCar.year} {props.selectedCar.make} {props.selectedCar.model}
          </DialogDescription>
        </DialogHeader>
        <RefuelingCreateForm carId={props.selectedCar.id} onSubmit={() => setShowDialog(false)} />
      </DialogContent>
    </Dialog>
  );
}
