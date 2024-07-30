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
import { Plus } from "lucide-react";
import { useState } from "react";

interface AddRefuelingProps {
  selectedCar: CarRead;
}

export function AddRefueling(props: AddRefuelingProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <Button className="hidden sm:inline-flex" size="sm" onClick={() => setShowDialog(true)}>
        Add refueling
      </Button>
      <Button className="sm:hidden" size="icon" onClick={() => setShowDialog(true)}>
        <Plus className="h-5 w-5" />
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
