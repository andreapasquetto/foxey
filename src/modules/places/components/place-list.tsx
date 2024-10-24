"use client";

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
import { DeletePlace } from "@/modules/places/components/delete-place";
import { usePlacesPaginatedQuery } from "@/modules/places/places-queries";
import { CheckIcon, XIcon } from "lucide-react";

export function PlaceList() {
  const query = usePlacesPaginatedQuery();

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

  const places = query.data.records;

  if (!places.length) {
    return (
      <div className="my-6">
        <p className="text-center text-sm text-muted-foreground">There are no places.</p>
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
          {places.map((place) => (
            <TableRow key={place.id}>
              <TableCell>
                <div>
                  <div>{place.name}</div>
                  {place.category && (
                    <div className="space-x-2 text-sm text-muted-foreground">
                      <span>{place.category.name}</span>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>{place.coordinates?.join(", ") ?? "-"}</TableCell>
              <TableCell>{place.address ?? "-"}</TableCell>
              <TableCell>
                {place.isVisited ? (
                  <CheckIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
                ) : (
                  <XIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end">
                  <DeletePlace place={place} />
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
      <TableHead>Name</TableHead>
      <TableHead>Coordinates</TableHead>
      <TableHead>Address</TableHead>
      <TableHead>Visited</TableHead>
      <TableHead></TableHead>
    </TableRow>
  );
}

function TableRowsSkeleton() {
  return Array.from({ length: 3 }).map((_, i) => (
    <TableRow key={i}>
      <TableCell>
        <div className="space-y-1">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-20" />
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-52" />
      </TableCell>
      <TableCell>
        <Skeleton className="aspect-square h-5" />
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-end">
          <Skeleton className="aspect-square h-10" />
        </div>
      </TableCell>
    </TableRow>
  ));
}
