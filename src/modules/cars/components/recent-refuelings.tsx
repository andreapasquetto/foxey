import { CircularSpinner } from "@/components/circular-spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRefuelingsQuery } from "@/modules/cars/cars-queries";
import { CheckIcon, XIcon } from "lucide-react";

interface RecentRefuelingsProps {
  carId: string | undefined;
}

export function RecentRefuelings(props: RecentRefuelingsProps) {
  const { data: refuelings, isFetching } = useRefuelingsQuery();

  if (!refuelings || isFetching) {
    return <CircularSpinner className="mx-auto" />;
  }

  // TODO: pass carId to query as a filter
  const filteredRefuelings = props.carId
    ? refuelings.filter((refueling) => refueling.carId === props.carId)
    : refuelings;

  if (!filteredRefuelings.length) {
    return (
      <div className="my-6">
        <p className="text-center text-sm text-muted-foreground">
          {props.carId && "No refueling found for the selected car."}
          {!props.carId && "There are no refuelings."}
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Place</TableHead>
          <TableHead>
            Cost (<code>€</code>)
          </TableHead>
          <TableHead>
            Quantity (<code>l</code>)
          </TableHead>
          <TableHead>
            Price (<code>€/l</code>)
          </TableHead>
          <TableHead>Full tank</TableHead>
          <TableHead>Necessary</TableHead>
          <TableHead>
            Trip (<code>km</code>)
          </TableHead>
          <TableHead>
            Odometer (<code>km</code>)
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredRefuelings.map((refueling) => (
          <TableRow key={refueling.id}>
            <TableCell>{refueling.date}</TableCell>
            <TableCell>{refueling.place}</TableCell>
            <TableCell>
              <code>{refueling.cost}</code>
            </TableCell>
            <TableCell>
              <code>{refueling.quantity}</code>
            </TableCell>
            <TableCell>
              <code>{refueling.price}</code>
            </TableCell>
            <TableCell>
              {refueling.isFull ? (
                <CheckIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
              ) : (
                <XIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
              )}
            </TableCell>
            <TableCell>
              {refueling.isNecessary ? (
                <CheckIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
              ) : (
                <XIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
              )}
            </TableCell>
            <TableCell>
              <code>{refueling.trip}</code>
            </TableCell>
            <TableCell>
              <code>{refueling.odometer}</code>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
