"use client";

import { Heading1 } from "@/components/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddHighwayTrip } from "@/modules/cars/components/add-highway-trip";
import { AddRefueling } from "@/modules/cars/components/add-refueling";
import CarStats from "@/modules/cars/components/car-stats";
import { CarSwitcher } from "@/modules/cars/components/car-switcher";
import { HighwayTrips } from "@/modules/cars/components/highway-trips";
import { RefuelingList } from "@/modules/cars/components/refueling-list";
import { CarRead } from "@/modules/cars/schemas/car-read-schema";
import { useState } from "react";

export default function CarsPage() {
  const [selectedCar, setSelectedCar] = useState<CarRead | undefined>(undefined);

  return (
    <section>
      <div className="mb-6">
        <Heading1>Cars</Heading1>
      </div>
      <div className="mt-3 space-y-3">
        <CarStats carId={selectedCar?.id} />
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Refuelings</CardTitle>
              <CarSwitcher selectedCar={selectedCar} onSelectCar={setSelectedCar} />
              {selectedCar && <AddRefueling selectedCar={selectedCar} />}
            </div>
          </CardHeader>
          <CardContent>
            <RefuelingList carId={selectedCar?.id} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Highway trips</CardTitle>
              </div>
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
