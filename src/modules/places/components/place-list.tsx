"use client";

import { placeRoute } from "@/common/routes";
import { QueryPagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePlacesPaginatedQuery } from "@/modules/places/places-queries";
import { CheckIcon, Edit, MoreHorizontal, XIcon } from "lucide-react";
import Link from "next/link";

interface PlaceListProps {
  searchFilter?: string;
  categoryId?: string;
  onlyVisited?: boolean;
}

export function PlaceList(props: PlaceListProps) {
  const query = usePlacesPaginatedQuery({
    searchFilter: props.searchFilter,
    categoryId: props.categoryId,
    onlyVisited: props.onlyVisited,
  });

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
              <TableCell>{place.coordinates?.join(", ")}</TableCell>
              <TableCell>{place.address}</TableCell>
              <TableCell>
                {place.isVisited ? (
                  <CheckIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
                ) : (
                  <XIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[250px]">
                    <DropdownMenuItem asChild>
                      <Link
                        href={placeRoute(place.id)}
                        className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
                      >
                        Edit <Edit className="h-5 w-5" />
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
        <Skeleton className="h-4 w-32" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-52" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="ml-auto h-9 w-11" />
      </TableCell>
    </TableRow>
  ));
}
