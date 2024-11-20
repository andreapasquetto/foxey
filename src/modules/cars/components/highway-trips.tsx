"use client";

import { Button } from "@/components/ui/button";
import { CarSwitcher } from "@/modules/cars/components/car-switcher";
import { HighwayTripList } from "@/modules/cars/components/highway-trip-list";
import { CarRead } from "@/modules/cars/schemas/car-read-schema";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function HighwayTrips() {
  const router = useRouter();
  const [selectedCar, setSelectedCar] = useState<CarRead | undefined>(undefined);

  function redirectToHighwayTripCreatePage() {
    router.push("/cars/highway-trips/new");
  }

  return (
    <>
      <div className="flex items-center justify-end gap-3">
        <CarSwitcher selectedCar={selectedCar} onSelectCar={setSelectedCar} />
        <Button
          className="hidden sm:inline-flex"
          size="sm"
          onClick={() => redirectToHighwayTripCreatePage()}
        >
          Add highway trip
        </Button>
        <Button className="sm:hidden" size="icon" onClick={() => redirectToHighwayTripCreatePage()}>
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      <HighwayTripList carId={selectedCar?.id} />
    </>
  );
}
