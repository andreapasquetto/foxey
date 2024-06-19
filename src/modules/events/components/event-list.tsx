import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Event, mockedEvents } from "@/mocks/events";
import { CheckIcon, XIcon } from "lucide-react";

function _renderIsAllDayIcon(event: Event) {
  return event.isAllDay ? (
    <CheckIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
  ) : (
    <XIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
  );
}

export function EventList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Start</TableHead>
          <TableHead>All day</TableHead>
          <TableHead>End</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockedEvents.map((event) => (
          <TableRow key={event.id}>
            <TableCell>{event.type}</TableCell>
            <TableCell>{event.startDatetime}</TableCell>
            <TableCell>{_renderIsAllDayIcon(event)}</TableCell>
            <TableCell>{event.endDatetime ?? "-"}</TableCell>
            <TableCell>{event.name}</TableCell>
            <TableCell>{event.description ?? "-"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
