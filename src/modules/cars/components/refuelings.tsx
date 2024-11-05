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
    <>
      <div className="flex items-center justify-end gap-3">
        {selectedCar && <AddRefueling selectedCar={selectedCar} />}
        <CarSwitcher selectedCar={selectedCar} onSelectCar={setSelectedCar} />
      </div>
      <RefuelingList carId={selectedCar?.id} />
    </>
  );
}
