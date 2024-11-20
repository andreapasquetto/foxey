"use client";

import { Button } from "@/components/ui/button";
import { CarSwitcher } from "@/modules/cars/components/car-switcher";
import { RefuelingList } from "@/modules/cars/components/refueling-list";
import { CarRead } from "@/modules/cars/schemas/car-read-schema";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Refuelings() {
  const router = useRouter();
  const [selectedCar, setSelectedCar] = useState<CarRead | undefined>(undefined);

  function redirectToRefuelingCreatePage() {
    router.push("/cars/refuelings/new");
  }

  return (
    <>
      <div className="flex items-center justify-end gap-3">
        <CarSwitcher selectedCar={selectedCar} onSelectCar={setSelectedCar} />
        <Button
          className="hidden sm:inline-flex"
          size="sm"
          onClick={() => redirectToRefuelingCreatePage()}
        >
          Add refueling
        </Button>
        <Button className="sm:hidden" size="icon" onClick={() => redirectToRefuelingCreatePage()}>
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      <RefuelingList carId={selectedCar?.id} />
    </>
  );
}
