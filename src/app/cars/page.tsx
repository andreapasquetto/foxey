import { Heading1, Heading2 } from "@/components/typography";
import CarStats from "@/modules/cars/components/car-stats";
import { HighwayTrips } from "@/modules/cars/components/highway-trips";
import { Refuelings } from "@/modules/cars/components/refuelings";

export default function CarsPage() {
  return (
    <div className="space-y-12">
      <Heading1>Cars</Heading1>
      <section className="space-y-6">
        <Heading2>Refuelings</Heading2>
        <Refuelings />
      </section>
      <section className="space-y-6">
        <Heading2>Highway trips</Heading2>
        <HighwayTrips />
      </section>
      <section className="space-y-6">
        <Heading2>Stats</Heading2>
        <CarStats />
      </section>
    </div>
  );
}
