import type { Metadata } from "next";
import { Heading1, Heading2 } from "@/components/typography";
import { CarActionButtons } from "@/modules/mobility/components/car-action-buttons";
import { CarStats } from "@/modules/mobility/components/car-stats";
import { HighwayTripList } from "@/modules/mobility/components/highway-trip-list";
import { InspectionsList } from "@/modules/mobility/components/inspections-list";
import { RefuelingsList } from "@/modules/mobility/components/refuelings-list";
import { ServicesList } from "@/modules/mobility/components/services-list";
import {
  getAllInspections,
  getAllRefuelings,
  getAllServices,
  getCarById,
} from "@/modules/mobility/server-actions";

export const metadata: Metadata = {
  title: "Car Details",
};

export default async function CarDetailsPage(props: {
  params: Promise<{ id: string }>;
}) {
  const id = (await props.params).id;
  const car = await getCarById(id);

  const refuelings = await getAllRefuelings(id);
  const services = await getAllServices(id);
  const inspections = await getAllInspections(id);

  return (
    <div className="space-y-12 pb-24">
      <Heading1>
        {car.make} {car.model}
      </Heading1>
      <CarActionButtons carId={id} />
      <section className="space-y-6">
        <Heading2>Stats</Heading2>
        <CarStats
          refuelings={refuelings}
          services={services}
          inspections={inspections}
        />
      </section>
      <section className="space-y-6">
        <Heading2>Refuelings</Heading2>
        <RefuelingsList refuelings={refuelings} />
      </section>
      <section className="space-y-6">
        <Heading2>Highway trips</Heading2>
        <HighwayTripList carId={id} />
      </section>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <section className="space-y-6">
          <Heading2>Services</Heading2>
          <ServicesList services={services} />
        </section>
        <section className="space-y-6">
          <Heading2>Inspections</Heading2>
          <InspectionsList inspections={inspections} />
        </section>
      </div>
    </div>
  );
}
