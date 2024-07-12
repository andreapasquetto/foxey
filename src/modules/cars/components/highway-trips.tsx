import { CircularSpinner } from "@/components/circular-spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useHighwayTripsQuery } from "@/modules/cars/cars-queries";

interface HighwayTripsProps {
  carId: string | undefined;
}

export function HighwayTrips(props: HighwayTripsProps) {
  const { data: trips, isFetching } = useHighwayTripsQuery();

  if (!trips || isFetching) {
    return <CircularSpinner className="mx-auto" />;
  }

  const filteredTrips = props.carId ? trips.filter((trip) => trip.carId === props.carId) : trips;

  if (!filteredTrips.length) {
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
    <Table>
      <TableHeader>
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
      </TableHeader>
      <TableBody>
        {filteredTrips.map((trip) => (
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
  );
}
