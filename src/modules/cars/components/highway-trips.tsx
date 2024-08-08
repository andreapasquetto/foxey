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
    <Card>
      <CardHeader>
        <div className="flex flex-col justify-center gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Highway trips</CardTitle>
          </div>
          <div className="flex items-center gap-3">
            {selectedCar && <AddHighwayTrip selectedCar={selectedCar} />}
            <CarSwitcher selectedCar={selectedCar} onSelectCar={setSelectedCar} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <HighwayTripList carId={selectedCar?.id} />
      </CardContent>
    </Card>
  );
}
