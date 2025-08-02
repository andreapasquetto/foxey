import { rawCurrencyFormatter } from "@/common/formatters";
import { transactionRoute } from "@/common/routes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { highwayTripsGetAll } from "@/modules/mobility/mobility-actions";
import { format } from "date-fns";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export async function HighwayTripList(props: { carId: string }) {
  const trips = await highwayTripsGetAll(props.carId);

  if (!trips.length) {
    return <ComponentEmptyState />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-36">Date</TableHead>
          <TableHead>Starting toll</TableHead>
          <TableHead>Ending toll</TableHead>
          <TableHead>
            Distance (<code>km</code>)
          </TableHead>
          <TableHead>
            Cost (<code>€</code>)
          </TableHead>
          <TableHead>
            Average speed (<code>km/h</code>)
          </TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trips.slice(0, 10).map((trip) => (
          <TableRow key={trip.id}>
            <TableCell>
              <code>{format(trip.transaction.datetime, "ccc y-MM-dd HH:mm")}</code>
            </TableCell>
            <TableCell>{trip.startingToll}</TableCell>
            <TableCell>{trip.endingToll}</TableCell>
            <TableCell>
              <code>{trip.distance}</code>
            </TableCell>
            <TableCell>
              <code>{rawCurrencyFormatter.format(Number(trip.transaction.amount))}</code>
            </TableCell>
            <TableCell>
              <code>{trip.avgSpeed}</code>
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-end gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={transactionRoute(trip.transaction.id)}
                      target="_blank"
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-accent",
                      )}
                    >
                      <ExternalLink className="h-5 w-5" />
                      <span className="sr-only">Related transaction</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="top">View related transaction</TooltipContent>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function ComponentEmptyState() {
  return (
    <div className="my-6">
      <p className="text-center text-sm text-muted-foreground">
        There are no highway trips for this car.
      </p>
    </div>
  );
}
