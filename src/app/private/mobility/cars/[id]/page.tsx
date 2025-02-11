"use client";

import { Heading1, Heading2 } from "@/components/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { CarStats } from "@/modules/mobility/components/car-stats";
import { HighwayTripList } from "@/modules/mobility/components/highway-trip-list";
import { InspectionList } from "@/modules/mobility/components/inspection-list";
import { RefuelingList } from "@/modules/mobility/components/refueling-list";
import { ServiceList } from "@/modules/mobility/components/service-list";
import { useCarsGetByIdQuery } from "@/modules/mobility/mobility-queries";
import { useParams } from "next/navigation";

export default function CarPage() {
  const params = useParams<{ id: string }>();

  const carQuery = useCarsGetByIdQuery(params.id);

  if (!carQuery.data) {
    return <Skeleton className="h-12 w-96" />;
  }

  const car = carQuery.data;

  return (
    <div className="space-y-12">
      <Heading1>
        {car.make} {car.model}
      </Heading1>
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
