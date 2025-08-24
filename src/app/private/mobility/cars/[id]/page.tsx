import { Heading1, Heading2 } from "@/components/typography";
import { CarActionButtons } from "@/modules/mobility/components/car-action-buttons";

import { CarStats } from "@/modules/mobility/components/car-stats";
import { HighwayTripList } from "@/modules/mobility/components/highway-trip-list";
import { InspectionList } from "@/modules/mobility/components/inspection-list";
import { RefuelingList } from "@/modules/mobility/components/refueling-list";
import { ServiceList } from "@/modules/mobility/components/service-list";
import {
  carsGetById,
  inspectionsGetAll,
  refuelingsGetAll,
  servicesGetAll,
} from "@/modules/mobility/mobility-actions";

export default async function CarPage(props: { params: Promise<{ id: string }> }) {
  const id = (await props.params).id;
  const car = await carsGetById(id);

  const refuelings = await refuelingsGetAll(id);
  const services = await servicesGetAll(id);
  const inspections = await inspectionsGetAll(id);

  return (
    <div className="space-y-12 pb-24">
      <Heading1>
        {car.make} {car.model}
      </Heading1>
      <CarActionButtons carId={id} />
      <section className="space-y-6">
        <Heading2>Stats</Heading2>
        <CarStats refuelings={refuelings} services={services} inspections={inspections} />
      </section>
      <section className="space-y-6">
        <Heading2>Refuelings</Heading2>
        <RefuelingList refuelings={refuelings} />
      </section>
      <section className="space-y-6">
        <Heading2>Highway trips</Heading2>
        <HighwayTripList carId={id} />
      </section>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <section className="space-y-6">
          <Heading2>Services</Heading2>
          <ServiceList services={services} />
        </section>
        <section className="space-y-6">
          <Heading2>Inspections</Heading2>
          <InspectionList inspections={inspections} />
        </section>
      </div>
    </div>
  );
}
