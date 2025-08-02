import { numberFormatter } from "@/common/formatters";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Inspection } from "@/db/types/mobility";
import { format } from "date-fns";

export function InspectionList(props: { inspections: Inspection[] }) {
  const { inspections } = props;

  if (!inspections.length) {
    return <ComponentEmptyState />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-36">Date</TableHead>
          <TableHead>
            Odometer (<code>km</code>)
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inspections.map((inspection) => (
          <TableRow key={inspection.id}>
            <TableCell>
              <code>{format(inspection.datetime, "ccc y-MM-dd HH:mm")}</code>
            </TableCell>
            <TableCell>
              <code>{numberFormatter.format(Number(inspection.odometer))}</code>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function ComponentEmptyState() {
  return (
    <div className="my-6">
      <p className="text-center text-sm text-muted-foreground">
        There are no inspections for this car.
      </p>
    </div>
  );
}
