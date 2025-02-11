import {
  newCarRoute,
  newHighwayTripRoute,
  newInspectionRoute,
  newRefuelingRoute,
} from "@/common/routes";
import { Heading1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CarList } from "@/modules/mobility/components/car-list";
import { BookOpenCheck, CarFront, Fuel, Gauge, Plus } from "lucide-react";
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
                href={newRefuelingRoute}
                className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
              >
                Add refueling <Fuel className="h-5 w-5" />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={newHighwayTripRoute}
                className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
              >
                Add highway trip <Gauge className="h-5 w-5" />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={newInspectionRoute}
                className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
              >
                Add inspection <BookOpenCheck className="h-5 w-5" />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={newCarRoute}
                className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
              >
                Add car <CarFront className="h-5 w-5" />
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <section className="space-y-6">
        <CarList />
      </section>
    </div>
  );
}
