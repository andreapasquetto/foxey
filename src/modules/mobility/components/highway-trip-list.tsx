import { currencyFormatter } from "@/common/formatters";
import { transactionRoute } from "@/common/routes";
import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { highwayTripsGetAll } from "@/modules/mobility/mobility-actions";
import { format } from "date-fns";
import { Coins, ExternalLink, Gauge, Waypoints } from "lucide-react";
import Link from "next/link";

export async function HighwayTripList(props: { carId: string }) {
  const trips = await highwayTripsGetAll(props.carId);

  if (!trips.length) {
    return <EmptyStateMessage message="There are no highway trips for this car." />;
  }

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {trips.map((trip) => (
        <Card key={trip.id} className="relative">
          <div className="absolute right-2 top-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={transactionRoute(trip.transaction.id)}
                  target="_blank"
                  className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-accent"
                >
                  <ExternalLink className="size-5" />
                  <span className="sr-only">Related transaction</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top">View related transaction</TooltipContent>
            </Tooltip>
          </div>
          <CardHeader>
            <CardDescription>
              <CardDescription>
                {format(trip.transaction.datetime, "ccc y-MM-dd HH:mm")}
              </CardDescription>
            </CardDescription>
            <CardTitle>
              {trip.startingToll} - {trip.endingToll}
            </CardTitle>
            <CardContent>
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
            </CardContent>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
