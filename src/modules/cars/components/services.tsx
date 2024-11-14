"use client";

import { CarSwitcher } from "@/modules/cars/components/car-switcher";
import { ServiceList } from "@/modules/cars/components/service-list";
import { CarRead } from "@/modules/cars/schemas/car-read-schema";
import { useState } from "react";

export function Services() {
  const [selectedCar, setSelectedCar] = useState<CarRead | undefined>(undefined);

  return (
    <>
      <div className="flex items-center justify-end gap-3">
        <CarSwitcher selectedCar={selectedCar} onSelectCar={setSelectedCar} />
      </div>
      <ServiceList carId={selectedCar?.id} />
    </>
  );
}
