import { Heading1, Heading2 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CarList } from "@/modules/mobility/components/car-list";
import CarStats from "@/modules/mobility/components/car-stats";
import { HighwayTrips } from "@/modules/mobility/components/highway-trips";
import { Refuelings } from "@/modules/mobility/components/refuelings";
import { Services } from "@/modules/mobility/components/services";
import { CarFront, Fuel, Gauge, Plus } from "lucide-react";
import Link from "next/link";

export default function MobilityPage() {
  return (
    <div className="space-y-12 pb-20">
      <Heading1>Mobility</Heading1>
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
                href="/mobility/cars/new"
                className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
              >
                Add car <CarFront className="h-5 w-5" />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/mobility/refuelings/new"
                className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
              >
                Add refueling <Fuel className="h-5 w-5" />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/mobility/highway-trips/new"
                className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
              >
                Add highway trip <Gauge className="h-5 w-5" />
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
