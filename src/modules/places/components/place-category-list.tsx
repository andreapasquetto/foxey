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
import { usePlaceCategoriesGetPaginatedQuery } from "@/modules/places/places-queries";

interface PlaceCategoryListProps {
  searchFilter?: string;
}

export function PlaceCategoryList(props: PlaceCategoryListProps) {
  const query = usePlaceCategoriesGetPaginatedQuery({
    searchFilter: props.searchFilter,
  });

  if (!query.data) {
    return <ComponentSkeleton />;
  }

  const categories = query.data.records;

  if (!categories.length) {
    return <ComponentEmptyState />;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableHeaderRow />
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="text-muted-foreground">{category.parent?.name}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.usages}</TableCell>
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
      <TableHead>Parent</TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Usages</TableHead>
    </TableRow>
  );
}

function TableRowsSkeleton() {
  return Array.from({ length: 3 }).map((_, i) => (
    <TableRow key={i}>
      <TableCell>
        <Skeleton className="h-4 w-32" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-52" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-5" />
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
      <p className="text-center text-sm text-muted-foreground">There are no categories.</p>
    </div>
  );
}
