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
import { useHighwayTripsGetPaginatedQuery } from "@/modules/mobility/mobility-queries";
import { format } from "date-fns";

interface HighwayTripsProps {
  carId: string | undefined;
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
          {props.carId && "No highway trips found for the selected car."}
          {!props.carId && "There are no highway trips."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableHeaderRow carId={props.carId} />
        </TableHeader>
        <TableBody>
          {trips.map((trip) => (
            <TableRow key={trip.id}>
              <TableCell>
                <code>{format(trip.datetime, "ccc y-MM-dd HH:mm")}</code>
              </TableCell>
              {!props.carId && <TableCell>{`${trip.car.make} ${trip.car.model}`}</TableCell>}
              <TableCell>{trip.startingToll}</TableCell>
              <TableCell>{trip.endingToll}</TableCell>
              <TableCell>
                <code>{trip.distance}</code>
              </TableCell>
              <TableCell>
                <code>{trip.cost}</code>
              </TableCell>
              <TableCell>
                <code>{trip.avgSpeed}</code>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <QueryPagination query={query} />
    </div>
  );
}

function TableHeaderRow(props: { carId?: string }) {
  return (
    <TableRow>
      <TableHead className="min-w-36">Date</TableHead>
      {!props.carId && <TableHead>Car</TableHead>}
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
    </TableRow>
  ));
}
