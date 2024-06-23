"use client";

import { Heading1 } from "@/components/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car } from "@/mocks/cars";
import { AddHighwayTrip } from "@/modules/cars/components/add-highway-trip";
import { AddRefueling } from "@/modules/cars/components/add-refueling";
import { CarSwitcher } from "@/modules/cars/components/car-switcher";
import { HighwayTrips } from "@/modules/cars/components/highway-trips";
import { RecentRefuelings } from "@/modules/cars/components/recent-refuelings";
import RefuelingStats from "@/modules/cars/components/refueling-stats";
import { useState } from "react";

export default function CarsPage() {
  const [selectedCar, setSelectedCar] = useState<Car | undefined>(undefined);

  return (
    <section>
      <Heading1>Cars</Heading1>
      <CarSwitcher selectedCar={selectedCar} onSelectCar={setSelectedCar} />
      <div className="mt-3 grid gap-3">
        <RefuelingStats carId={selectedCar?.id} />
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent refuelings</CardTitle>
              {selectedCar && <AddRefueling selectedCar={selectedCar} />}
            </div>
          </CardHeader>
          <CardContent>
            <RecentRefuelings carId={selectedCar?.id} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Highway trips</CardTitle>
              {selectedCar && <AddHighwayTrip selectedCar={selectedCar} />}
            </div>
          </CardHeader>
          <CardContent>
            <HighwayTrips carId={selectedCar?.id} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
