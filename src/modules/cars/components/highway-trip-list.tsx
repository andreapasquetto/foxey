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
import { useHighwayTripsPaginatedQuery } from "@/modules/cars/cars-queries";

interface HighwayTripsProps {
  carId: string | undefined;
}

export function HighwayTripList(props: HighwayTripsProps) {
  const query = useHighwayTripsPaginatedQuery(props.carId);

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
          <TableHeaderRow />
        </TableHeader>
        <TableBody>
          {trips.map((trip) => (
            <TableRow key={trip.id}>
              <TableCell>{trip.date}</TableCell>
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

function TableHeaderRow() {
  return (
    <TableRow>
      <TableHead>Date</TableHead>
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
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-32" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-32" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-14" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-14" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-14" />
      </TableCell>
    </TableRow>
  ));
}
