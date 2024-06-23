import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockedRefuelings } from "@/mocks/cars";
import { CheckIcon, XIcon } from "lucide-react";

interface RecentRefuelingsProps {
  carId: string | undefined;
}

export function RecentRefuelings(props: RecentRefuelingsProps) {
  if (!props.carId) {
    return (
      <div className="my-6">
        <p className="text-center text-sm text-muted-foreground">
          Select a car to see its refuelings.
        </p>
      </div>
    );
  }

  const filteredRefuelings = mockedRefuelings.find((refueling) => refueling.carId === props.carId);

  if (!filteredRefuelings) {
    return (
      <div className="my-6">
        <p className="text-center text-sm text-muted-foreground">
          No refueling found for the selected car.
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
        {filteredRefuelings.refuelings.map((refueling) => (
          <TableRow key={refueling.id}>
            <TableCell>{refueling.datetime}</TableCell>
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
