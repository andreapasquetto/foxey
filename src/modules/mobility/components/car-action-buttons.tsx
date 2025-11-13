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

export function CarActionButtons(props: { carId: string }) {
  return (
    <div className="fixed right-4 bottom-4 z-50 m-0 sm:right-6 sm:bottom-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="size-14 rounded-xl">
            <Plus className="size-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4 w-[250px] sm:mr-6">
          <DropdownMenuItem asChild>
            <Link
              href={newRefuelingRoute(props.carId)}
              className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
              prefetch
            >
              Add refueling <Fuel className="size-5" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={newHighwayTripRoute(props.carId)}
              className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
              prefetch
            >
              Add highway trip <Gauge className="size-5" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={newServiceRoute(props.carId)}
              className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
              prefetch
            >
              Add service <Wrench className="size-5" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={newInspectionRoute(props.carId)}
              className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
              prefetch
            >
              Add inspection <BookOpenCheck className="size-5" />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
