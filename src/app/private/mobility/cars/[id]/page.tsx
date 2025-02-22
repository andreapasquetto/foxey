"use client";

import { newHighwayTripRoute, newInspectionRoute, newRefuelingRoute } from "@/common/routes";
import { Heading1, Heading2 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { CarStats } from "@/modules/mobility/components/car-stats";
import { HighwayTripList } from "@/modules/mobility/components/highway-trip-list";
import { InspectionList } from "@/modules/mobility/components/inspection-list";
import { RefuelingList } from "@/modules/mobility/components/refueling-list";
import { ServiceList } from "@/modules/mobility/components/service-list";
import { useCarsGetByIdQuery } from "@/modules/mobility/mobility-queries";
import { BookOpenCheck, Fuel, Gauge, Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CarPage() {
  const params = useParams<{ id: string }>();

  const carQuery = useCarsGetByIdQuery(params.id);

  if (!carQuery.data) {
    return <Skeleton className="h-12 w-96" />;
  }

  const car = carQuery.data;

  return (
    <div className="space-y-12 pb-20">
      <Heading1>
        {car.make} {car.model}
      </Heading1>
      <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-14 w-14 rounded-xl">
              <Plus className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4 w-[250px] sm:mr-6">
            <DropdownMenuItem asChild>
              <Link
                href={newRefuelingRoute}
                className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
                prefetch
              >
                Add refueling <Fuel className="h-5 w-5" />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={newHighwayTripRoute}
                className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
                prefetch
              >
                Add highway trip <Gauge className="h-5 w-5" />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={newInspectionRoute}
                className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
                prefetch
              >
                Add inspection <BookOpenCheck className="h-5 w-5" />
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <section className="space-y-6">
        <Heading2>Stats</Heading2>
        <CarStats carId={params.id} />
      </section>
      <section className="space-y-6">
        <Heading2>Refuelings</Heading2>
        <RefuelingList carId={params.id} />
      </section>
      <section className="space-y-6">
        <Heading2>Highway trips</Heading2>
        <HighwayTripList carId={params.id} />
      </section>
      <section className="space-y-6">
        <Heading2>Services</Heading2>
        <ServiceList carId={params.id} />
      </section>
      <section className="space-y-6">
        <Heading2>Inspections</Heading2>
        <InspectionList carId={params.id} />
      </section>
    </div>
  );
}
