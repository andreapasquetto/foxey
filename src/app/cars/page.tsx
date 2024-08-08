import { Heading1 } from "@/components/typography";
import CarStats from "@/modules/cars/components/car-stats";
import { HighwayTrips } from "@/modules/cars/components/highway-trips";
import { Refuelings } from "@/modules/cars/components/refuelings";

export default function CarsPage() {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <Heading1>Cars</Heading1>
      </div>
      <div className="mt-3 space-y-3">
        <CarStats />
        <Refuelings />
        <HighwayTrips />
      </div>
    </section>
  );
}
