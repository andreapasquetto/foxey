"use client";

import { CarSwitcher } from "@/modules/mobility/components/car-switcher";
import { ServiceList } from "@/modules/mobility/components/service-list";
import { CarRead } from "@/modules/mobility/schemas/car-read-schema";
import { useState } from "react";

export function Services() {
  const [selectedCar, setSelectedCar] = useState<CarRead | undefined>(undefined);

  return (
    <>
      <div className="sm:flex sm:items-center sm:justify-end sm:gap-3">
        <div className="sm:w-[250px]">
          <CarSwitcher selectedCar={selectedCar} onSelectCar={setSelectedCar} />
        </div>
      </div>
      <ServiceList carId={selectedCar?.id} />
    </>
  );
}
