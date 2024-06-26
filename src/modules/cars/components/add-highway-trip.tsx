import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HighwayTripCreateForm } from "@/modules/cars/components/highway-trip-create-form";
import { CarRead } from "@/modules/cars/schemas/car-read-schema";
import { useState } from "react";

interface AddHighwayTripProps {
  selectedCar: CarRead;
}

export function AddHighwayTrip(props: AddHighwayTripProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <Button size="sm" onClick={() => setShowDialog(true)}>
        Add trip
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add highway trip</DialogTitle>
          <DialogDescription>
            {props.selectedCar.year} {props.selectedCar.make} {props.selectedCar.model}
          </DialogDescription>
        </DialogHeader>
        <HighwayTripCreateForm carId={props.selectedCar.id} onSubmit={() => setShowDialog(false)} />
      </DialogContent>
    </Dialog>
  );
}
