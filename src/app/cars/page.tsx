"use client";

import { Heading1 } from "@/components/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, mockedCars } from "@/mocks/cars";
import { AddRefueling } from "@/modules/cars/components/add-refueling";
import { CarSwitcher } from "@/modules/cars/components/car-switcher";
import { RecentRefuelings } from "@/modules/cars/components/recent-refuelings";
import RefuelingStats from "@/modules/cars/components/refueling-stats";
import { useState } from "react";

export default function CarsPage() {
  const [selectedCar, setSelectedCar] = useState<Car>(mockedCars[0]);

  return (
    <section>
      <Heading1>Cars</Heading1>
      <div className="mt-3 flex items-center justify-between">
        <CarSwitcher selectedCar={selectedCar} onSelectCar={setSelectedCar} />
        <div>
          <AddRefueling selectedCar={selectedCar} />
        </div>
      </div>
      <div className="mt-3 grid gap-3">
        <RefuelingStats carId={selectedCar.id} />
        <Card>
          <CardHeader>
            <CardTitle>Recent refuelings</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentRefuelings carId={selectedCar.id} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
