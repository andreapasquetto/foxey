"use client";

import { transactionRoute } from "@/common/routes";
import { QueryPagination } from "@/components/pagination";
import { Skeleton } from "@/components/ui/skeleton";
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
import { useHighwayTripsGetPaginatedQuery } from "@/modules/mobility/mobility-queries";
import { format } from "date-fns";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface HighwayTripsProps {
  carId: string;
}

export function HighwayTripList(props: HighwayTripsProps) {
  const query = useHighwayTripsGetPaginatedQuery(props.carId);

  if (!query.data) {
    return (
      <Table>
        <TableHeader>
          <TableHeaderRow />
        </TableHeader>
        <TableBody>
          <TableRowsSkeleton />
        </TableBody>
      </Table>
    );
  }

  const trips = query.data.records;

  if (!trips.length) {
    return (
      <div className="my-6">
        <p className="text-center text-sm text-muted-foreground">
          There are no highway trips for this car.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableHeaderRow />
        </TableHeader>
        <TableBody>
          {trips.map((trip) => (
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
                <code>{trip.transaction.amount}</code>
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
      <QueryPagination query={query} />
    </div>
  );
}

function TableHeaderRow() {
  return (
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
  );
}

function TableRowsSkeleton() {
  return Array.from({ length: 3 }).map((_, i) => (
    <TableRow key={i}>
      <TableCell>
        <Skeleton className="h-4 w-44" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-36" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-14" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-10" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-10" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-10 w-10" />
      </TableCell>
    </TableRow>
  ));
}
