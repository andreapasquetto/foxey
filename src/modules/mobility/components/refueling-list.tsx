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
import { useRefuelingsGetPaginatedQuery } from "@/modules/mobility/mobility-queries";
import { format } from "date-fns";
import { CheckIcon, XIcon } from "lucide-react";

interface RefuelingListProps {
  carId: string | undefined;
}

export function RefuelingList(props: RefuelingListProps) {
  const query = useRefuelingsGetPaginatedQuery(props.carId);

  if (!query.data) {
    return (
      <Table>
        <TableHeader>
          <TableHeaderRow carId={props.carId} />
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
          <TableHeaderRow carId={props.carId} />
        </TableHeader>
        <TableBody>
          {refuelings.map((refueling) => (
            <TableRow key={refueling.id}>
              <TableCell>
                <code>{format(refueling.transaction.datetime, "ccc y-MM-dd HH:mm")}</code>
              </TableCell>
              {!props.carId && (
                <TableCell>{`${refueling.car.make} ${refueling.car.model}`}</TableCell>
              )}
              <TableCell>{refueling.transaction.place?.name}</TableCell>
              <TableCell>
                <code>{refueling.ron}</code>
              </TableCell>
              <TableCell>
                <code>{refueling.transaction.amount}</code>
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

function TableHeaderRow(props: { carId?: string }) {
  return (
    <TableRow>
      <TableHead className="min-w-36">Date</TableHead>
      {!props.carId && <TableHead>Car</TableHead>}
      <TableHead>Place</TableHead>
      <TableHead>RON</TableHead>
      <TableHead>
        Cost (<code>€</code>)
      </TableHead>
      <TableHead>
        Quantity (<code>L</code>)
      </TableHead>
      <TableHead>
        Price (<code>€/L</code>)
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
        <Skeleton className="h-4 w-44" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-36" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-6" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-8" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-14" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-14" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-14" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
    </TableRow>
  ));
}
