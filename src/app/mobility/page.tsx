import { Heading1, Heading2 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { CarList } from "@/modules/mobility/components/car-list";
import CarStats from "@/modules/mobility/components/car-stats";
import { HighwayTrips } from "@/modules/mobility/components/highway-trips";
import { Refuelings } from "@/modules/mobility/components/refuelings";
import { Services } from "@/modules/mobility/components/services";
import { Fuel, Gauge } from "lucide-react";
import Link from "next/link";

export default function MobilityPage() {
  return (
    <div className="space-y-12">
      <Heading1>Mobility</Heading1>
      <div className="mx-auto max-w-[250px] space-y-1 md:flex md:max-w-xl md:gap-1 md:space-y-0">
        <Button size="lg" asChild className="w-full">
          <Link href="/mobility/refuelings/new" className="gap-1">
            Add refueling <Fuel className="h-5 w-5" />
          </Link>
        </Button>
        <Button size="lg" asChild className="w-full">
          <Link href="/mobility/highway-trips/new" className="gap-1">
            Add highway trip <Gauge className="h-5 w-5" />
          </Link>
        </Button>
      </div>
      <section className="space-y-6">
        <Heading2>Cars</Heading2>
        <CarList />
      </section>
      <section className="space-y-6">
        <Heading2>Stats</Heading2>
        <CarStats />
      </section>
      <section className="space-y-6">
        <Heading2>Refuelings</Heading2>
        <Refuelings />
      </section>
      <section className="space-y-6">
        <Heading2>Highway trips</Heading2>
        <HighwayTrips />
      </section>
      <section className="space-y-6">
        <Heading2>Services</Heading2>
        <Services />
      </section>
    </div>
  );
}
