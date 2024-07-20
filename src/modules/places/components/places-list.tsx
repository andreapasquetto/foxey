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
import { DeletePlace } from "@/modules/places/components/delete-place";
import { usePlacesQuery } from "@/modules/places/places-queries";
import { CheckIcon, XIcon } from "lucide-react";

export function PlacesList() {
  const { data: places, isFetching } = usePlacesQuery();

  if (!places || isFetching) return <CircularSpinner className="mx-auto" />;

  if (!places.length) {
    return (
      <div className="my-6">
        <p className="text-center text-sm text-muted-foreground">There are no places.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Visited</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {places.map((place) => (
          <TableRow key={place.id}>
            <TableCell>{place.name}</TableCell>
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
  );
}
