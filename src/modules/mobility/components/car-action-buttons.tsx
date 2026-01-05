import { BookOpenCheck, Fuel, Gauge, Plus, Wrench } from "lucide-react";
import Link from "next/link";
import {
  newHighwayTripRoute,
  newInspectionRoute,
  newRefuelingRoute,
  newServiceRoute,
} from "@/common/routes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function CarActionButtons({ carId }: { carId: string }) {
  return (
    <div className="fixed right-4 bottom-4 z-50 m-0 sm:right-6 sm:bottom-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="size-14 rounded-xl">
            <Plus className="size-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[250px]">
          <DropdownMenuItem asChild>
            <Button
              variant="ghost"
              className="w-full cursor-pointer items-center justify-between"
              asChild
            >
              <Link href={newRefuelingRoute(carId)} prefetch>
                Add refueling <Fuel className="text-current" />
              </Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button
              variant="ghost"
              className="w-full cursor-pointer items-center justify-between"
              asChild
            >
              <Link href={newHighwayTripRoute(carId)} prefetch>
                Add highway trip <Gauge className="text-current" />
              </Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button
              variant="ghost"
              className="w-full cursor-pointer items-center justify-between"
              asChild
            >
              <Link href={newServiceRoute(carId)} prefetch>
                Add service <Wrench className="text-current" />
              </Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button
              variant="ghost"
              className="w-full cursor-pointer items-center justify-between"
              asChild
            >
              <Link href={newInspectionRoute(carId)} prefetch>
                Add inspection <BookOpenCheck className="text-current" />
              </Link>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
