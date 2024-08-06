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
import { useRefuelingsPaginatedQuery } from "@/modules/cars/cars-queries";
import { formatISO } from "date-fns";
import { CheckIcon, XIcon } from "lucide-react";

interface RecentRefuelingsProps {
  carId: string | undefined;
}

export function RefuelingList(props: RecentRefuelingsProps) {
  const query = useRefuelingsPaginatedQuery(props.carId);

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

  const refuelings = query.data.records;

  if (!refuelings.length) {
    return (
      <div className="my-6">
        <p className="text-center text-sm text-muted-foreground">
          {props.carId && "No refuelings found for the selected car."}
          {!props.carId && "There are no refuelings."}
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
          {!query.data && <TableRowsSkeleton />}
          {query.data &&
            query.data.records.map((refueling) => (
              <TableRow key={refueling.id}>
                <TableCell>{formatISO(refueling.date, { representation: "date" })}</TableCell>
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

function TableHeaderRow() {
  return (
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
  );
}

function TableRowsSkeleton() {
  return Array.from({ length: 3 }).map((_, i) => (
    <TableRow key={i}>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-36" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="aspect-square h-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="aspect-square h-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
    </TableRow>
  ));
}
