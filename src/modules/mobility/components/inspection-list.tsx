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
import { useInspectionsGetPaginatedQuery } from "@/modules/mobility/mobility-queries";
import { format } from "date-fns";

interface InspectionListProps {
  carId: string | undefined;
}

export function InspectionList(props: InspectionListProps) {
  const query = useInspectionsGetPaginatedQuery(props.carId);

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

  const inspections = query.data.records;

  if (!inspections.length) {
    return (
      <div className="my-6">
        <p className="text-center text-sm text-muted-foreground">
          {props.carId && "No inspections found for the selected car."}
          {!props.carId && "There are no inspections."}
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
          {inspections.map((inspection) => (
            <TableRow key={inspection.id}>
              <TableCell>
                <code>{format(inspection.datetime, "ccc y-MM-dd HH:mm")}</code>
              </TableCell>
              {!props.carId && (
                <TableCell>{`${inspection.car.make} ${inspection.car.model}`}</TableCell>
              )}
              <TableCell>
                <code>{inspection.odometer}</code>
              </TableCell>
              <TableCell></TableCell>
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
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-36" />
      </TableCell>
    </TableRow>
  ));
}
