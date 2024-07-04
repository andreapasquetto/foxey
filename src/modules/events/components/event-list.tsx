"use client";

import { CircularSpinner } from "@/components/circular-spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useEventsQuery } from "@/modules/events/events-queries";
import { format, isBefore, startOfToday } from "date-fns";
import { CheckIcon, XIcon } from "lucide-react";

export function EventList() {
  const { data: events, isFetching } = useEventsQuery();

  const today = startOfToday();

  if (!events || isFetching) return <CircularSpinner className="mx-auto" />;

  if (!events.length) {
    return (
      <div className="my-6">
        <p className="text-center text-sm text-muted-foreground">There are no events.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>All day</TableHead>
          <TableHead>Start</TableHead>
          <TableHead>End</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow
            key={event.id}
            className={cn({
              "bg-destructive/50": event.isCanceled,
              "opacity-50": isBefore(event.startDatetime, today),
            })}
          >
            <TableCell>{event.title}</TableCell>
            <TableCell>{event.description ?? "-"}</TableCell>
            <TableCell>
              {event.isAllDay ? (
                <CheckIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
              ) : (
                <XIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
              )}
            </TableCell>
            <TableCell className="font-mono">
              {event.endDatetime ? format(event.endDatetime, "ccc yyyy-MM-dd, HH:mm") : "-"}
            </TableCell>
            <TableCell className="font-mono">
              {event.startDatetime ? format(event.startDatetime, "ccc yyyy-MM-dd, HH:mm") : "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
