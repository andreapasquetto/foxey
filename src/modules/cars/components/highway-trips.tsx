import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockedHighwayTrips } from "@/mocks/cars";

interface HighwayTripsProps {
  carId: string;
}

export function HighwayTrips(props: HighwayTripsProps) {
  const filteredTrips = mockedHighwayTrips.find((toll) => toll.carId === props.carId);

  if (!filteredTrips)
    return (
      <div className="my-6">
        <p className="text-center text-sm text-muted-foreground">
          No highway trips found for the selected car.
        </p>
      </div>
    );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Start</TableHead>
          <TableHead>End</TableHead>
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
        {filteredTrips.trips.map((trip) => (
          <TableRow key={trip.id}>
            <TableCell>{trip.datetime}</TableCell>
            <TableCell>{trip.start}</TableCell>
            <TableCell>{trip.end}</TableCell>
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
