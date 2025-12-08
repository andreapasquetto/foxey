import { format } from "date-fns";
import { Coins, Gauge, SquareArrowOutUpRight, Waypoints } from "lucide-react";
import Link from "next/link";
import { currencyFormatter } from "@/common/formatters";
import { transactionRoute } from "@/common/routes";
import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { highwayTripsGetAll } from "@/modules/mobility/mobility-actions";

export async function HighwayTripList(props: { carId: string }) {
  const trips = await highwayTripsGetAll(props.carId);

  if (!trips.length) {
    return (
      <EmptyStateMessage message="There are no highway trips for this car." />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {trips.map((trip) => (
        <Item key={trip.id} variant="outline" className="relative">
          <div className="absolute top-2 right-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Link
                    href={transactionRoute(trip.transaction.id)}
                    target="_blank"
                  >
                    <SquareArrowOutUpRight />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Go to related transaction</TooltipContent>
            </Tooltip>
          </div>
          <ItemContent>
            <ItemDescription>
              {format(trip.transaction.datetime, "ccc y-MM-dd HH:mm")}
            </ItemDescription>
            <ItemTitle>
              {trip.startingToll} - {trip.endingToll}
            </ItemTitle>
            <div className="flex flex-wrap items-center gap-x-3 text-muted-foreground sm:justify-center sm:gap-x-6">
              <div className="flex items-center gap-1">
                <Coins className="size-4" />
                {currencyFormatter.format(Number(trip.transaction.amount))}
              </div>
              <div className="flex items-center gap-1">
                <Waypoints className="size-4" />
                {trip.distance} km
              </div>
              <div className="flex items-center gap-1">
                <Gauge className="size-4" />
                {trip.avgSpeed} km/h
              </div>
            </div>
          </ItemContent>
        </Item>
      ))}
    </div>
  );
}
