"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddHighwayTrip } from "@/modules/cars/components/add-highway-trip";
import { CarSwitcher } from "@/modules/cars/components/car-switcher";
import { HighwayTripList } from "@/modules/cars/components/highway-trip-list";
import { CarRead } from "@/modules/cars/schemas/car-read-schema";
import { useState } from "react";

export function HighwayTrips() {
  const [selectedCar, setSelectedCar] = useState<CarRead | undefined>(undefined);

  return (
    <>
      <div className="flex items-center justify-end gap-3">
        {selectedCar && <AddHighwayTrip selectedCar={selectedCar} />}
        <CarSwitcher selectedCar={selectedCar} onSelectCar={setSelectedCar} />
      </div>
      <HighwayTripList carId={selectedCar?.id} />
    </>
  );
}
