import { CircularSpinner } from "@/components/circular-spinner";
import { QueryPagination } from "@/components/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRefuelingsPaginatedQuery } from "@/modules/cars/cars-queries";
import { CheckIcon, XIcon } from "lucide-react";

interface RecentRefuelingsProps {
  carId: string | undefined;
}

export function RefuelingList(props: RecentRefuelingsProps) {
  const query = useRefuelingsPaginatedQuery(props.carId);

  if (!query.data || query.isFetching) {
    return <CircularSpinner className="mx-auto" />;
  }

  const refuelings = query.data.records;

  if (!refuelings.length) {
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
    <div>
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
          {refuelings.map((refueling) => (
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
      <QueryPagination query={query} />
    </div>
  );
}
