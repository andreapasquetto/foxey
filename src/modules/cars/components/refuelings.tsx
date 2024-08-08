"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddRefueling } from "@/modules/cars/components/add-refueling";
import { CarSwitcher } from "@/modules/cars/components/car-switcher";
import { RefuelingList } from "@/modules/cars/components/refueling-list";
import { CarRead } from "@/modules/cars/schemas/car-read-schema";
import { useState } from "react";

export function Refuelings() {
  const [selectedCar, setSelectedCar] = useState<CarRead | undefined>(undefined);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col justify-center gap-3 md:flex-row md:items-center md:justify-between">
          <CardTitle>Refuelings</CardTitle>
          <div className="flex items-center gap-3">
            {selectedCar && <AddRefueling selectedCar={selectedCar} />}
            <CarSwitcher selectedCar={selectedCar} onSelectCar={setSelectedCar} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <RefuelingList carId={selectedCar?.id} />
      </CardContent>
    </Card>
  );
}
