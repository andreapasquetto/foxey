import { placeRoute } from "@/common/routes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeletePlace } from "@/modules/places/components/delete-place";
import { placesGetAll } from "@/modules/places/places-actions";
import { CheckIcon, Edit, MoreHorizontal, XIcon } from "lucide-react";
import Link from "next/link";

export async function PlaceList(props: { query?: string }) {
  const places = await placesGetAll({
    query: props.query,
  });

  if (!places.length) {
    return <ComponentEmptyState />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Coordinates</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Visited</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {places.slice(0, 10).map((place) => (
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
                      prefetch
                    >
                      Edit <Edit className="h-5 w-5" />
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <DeletePlace place={place} />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function ComponentEmptyState() {
  return (
    <div className="my-6">
      <p className="text-center text-sm text-muted-foreground">There are no places.</p>
    </div>
  );
}
