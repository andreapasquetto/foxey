"use client";

import { numberFormatter } from "@/common/formatters";
import { QueryPagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useServicesGetPaginatedQuery } from "@/modules/mobility/mobility-queries";
import { format } from "date-fns";
import { Notebook } from "lucide-react";

interface ServiceListProps {
  carId: string;
}

export function ServiceList(props: ServiceListProps) {
  const query = useServicesGetPaginatedQuery(props.carId);

  if (!query.data) {
    return <ComponentSkeleton />;
  }

  const services = query.data.records;

  if (!services.length) {
    return <ComponentEmptyState />;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableHeaderRow />
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell>
                <code>{format(service.datetime, "ccc y-MM-dd HH:mm")}</code>
              </TableCell>
              <TableCell>
                <code>{numberFormatter.format(Number(service.odometer))}</code>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1">
                  {service.notes && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Dialog>
                          <DialogTrigger>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Notebook className="h-5 w-5" />
                                  <span className="sr-only">View notes</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top">View notes</TooltipContent>
                            </Tooltip>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Service notes</DialogTitle>
                              <DialogDescription>
                                {format(service.datetime, "ccc y-MM-dd HH:mm")}
                              </DialogDescription>
                            </DialogHeader>
                            <pre className="max-w-full text-wrap">{service.notes}</pre>
                          </DialogContent>
                        </Dialog>
                      </TooltipTrigger>
                      <TooltipContent side="top">View notes</TooltipContent>
                    </Tooltip>
                  )}
                </div>
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
      <TableHead className="min-w-36">Date</TableHead>
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

function ComponentSkeleton() {
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

function ComponentEmptyState() {
  return (
    <div className="my-6">
      <p className="text-center text-sm text-muted-foreground">
        There are no services for this car.
      </p>
    </div>
  );
}
