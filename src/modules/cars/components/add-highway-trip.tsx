import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HighwayTripCreateForm } from "@/modules/cars/components/forms/highway-trip-create-form";
import { CarRead } from "@/modules/cars/schemas/car-read-schema";
import { Plus } from "lucide-react";
import { useState } from "react";

interface AddHighwayTripProps {
  selectedCar: CarRead;
}

export function AddHighwayTrip(props: AddHighwayTripProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <Button className="hidden sm:inline-flex" size="sm" onClick={() => setShowDialog(true)}>
        Add trip
      </Button>
      <Button className="sm:hidden" size="icon" onClick={() => setShowDialog(true)}>
        <Plus className="h-5 w-5" />
      </Button>
      <DialogContent aria-describedby={undefined}>
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
