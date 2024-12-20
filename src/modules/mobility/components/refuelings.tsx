"use client";

import { CarSwitcher } from "@/modules/mobility/components/car-switcher";
import { RefuelingList } from "@/modules/mobility/components/refueling-list";
import { CarRead } from "@/modules/mobility/schemas/car-read-schema";
import { useState } from "react";

export function Refuelings() {
  const [selectedCar, setSelectedCar] = useState<CarRead | undefined>(undefined);

  return (
    <>
      <div className="sm:flex sm:items-center sm:justify-end sm:gap-3">
        <div className="sm:w-[250px]">
          <CarSwitcher selectedCar={selectedCar} onSelectCar={setSelectedCar} />
        </div>
      </div>
      <RefuelingList carId={selectedCar?.id} />
    </>
  );
}
