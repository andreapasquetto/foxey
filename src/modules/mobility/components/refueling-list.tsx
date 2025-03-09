"use client";

import { numberFormatter, rawCurrencyFormatter } from "@/common/formatters";
import { transactionRoute } from "@/common/routes";
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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useRefuelingsGetPaginatedQuery } from "@/modules/mobility/mobility-queries";
import { format } from "date-fns";
import { Check, ExternalLink, X } from "lucide-react";
import Link from "next/link";

interface RefuelingListProps {
  carId: string;
}

export function RefuelingList(props: RefuelingListProps) {
  const query = useRefuelingsGetPaginatedQuery(props.carId);

  if (!query.data) {
    return <ComponentSkeleton />;
  }

  const refuelings = query.data.records;

  if (!refuelings.length) {
    return <ComponentEmptyState />;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableHeaderRow />
        </TableHeader>
        <TableBody>
          {refuelings.map((refueling) => (
            <TableRow key={refueling.id}>
              <TableCell>
                <code>{format(refueling.transaction.datetime, "ccc y-MM-dd HH:mm")}</code>
              </TableCell>
              <TableCell>{refueling.transaction.place?.name}</TableCell>
              <TableCell>
                <code>{refueling.ron}</code>
              </TableCell>
              <TableCell>
                <code>{rawCurrencyFormatter.format(Number(refueling.transaction.amount))}</code>
              </TableCell>
              <TableCell>
                <code>{refueling.quantity}</code>
              </TableCell>
              <TableCell>
                <code>{refueling.price}</code>
              </TableCell>
              <TableCell>
                {refueling.isFull ? (
                  <Check className="h-5 w-5 text-green-500 dark:text-green-400" />
                ) : (
                  <X className="h-5 w-5 text-red-500 dark:text-red-400" />
                )}
              </TableCell>
              <TableCell>
                {refueling.isNecessary ? (
                  <Check className="h-5 w-5 text-green-500 dark:text-green-400" />
                ) : (
                  <X className="h-5 w-5 text-red-500 dark:text-red-400" />
                )}
              </TableCell>
              <TableCell>
                <code>{refueling.trip}</code>
              </TableCell>
              <TableCell>
                <code>{numberFormatter.format(Number(refueling.odometer))}</code>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={transactionRoute(refueling.transaction.id)}
                        target="_blank"
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-accent",
                        )}
                      >
                        <ExternalLink className="h-5 w-5" />
                        <span className="sr-only">Related transaction</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="top">View related transaction</TooltipContent>
                  </Tooltip>
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
      <TableHead></TableHead>
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
      <TableCell>
        <Skeleton className="h-10 w-10" />
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
        There are no refuelings for this car.
      </p>
    </div>
  );
}
