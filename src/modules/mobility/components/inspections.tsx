"use client";

import { CarSwitcher } from "@/modules/mobility/components/car-switcher";
import { InspectionList } from "@/modules/mobility/components/inspection-list";
import { CarRead } from "@/modules/mobility/schemas/car-read-schema";
import { useState } from "react";

export function Inspections() {
  const [selectedCar, setSelectedCar] = useState<CarRead | undefined>(undefined);

  return (
    <>
      <div className="sm:flex sm:items-center sm:justify-end sm:gap-3">
        <div className="sm:w-[250px]">
          <CarSwitcher selectedCar={selectedCar} onSelectCar={setSelectedCar} />
        </div>
      </div>
      <InspectionList carId={selectedCar?.id} />
    </>
  );
}
