import { placeRoute } from "@/common/routes";
import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeletePlace } from "@/modules/places/components/delete-place";
import { placesGetAll } from "@/modules/places/places-actions";
import { Check, Edit, ExternalLink, MoreHorizontal, X } from "lucide-react";
import Link from "next/link";

export async function PlaceList(props: { query?: string }) {
  const places = await placesGetAll({
    query: props.query,
  });

  if (!places.length) {
    return <EmptyStateMessage message="There are no places." />;
  }

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {places.slice(0, 10).map((place) => (
        <Card key={place.id} className="relative">
          <div className="absolute right-2 top-2 flex items-center gap-1">
            <div className="flex items-center gap-1 rounded-full border px-2 py-1 text-xs text-muted-foreground">
              {place.isVisited ? (
                <>
                  <Check className="size-4 text-green-500" />
                  Visited
                </>
              ) : (
                <>
                  <X className="size-4 text-red-500" />
                  Visited
                </>
              )}
            </div>
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
          </div>
          <CardHeader>
            {place.category && <CardDescription>{place.category.name}</CardDescription>}
            <CardTitle>{place.name}</CardTitle>
            {place.address && (
              <Link
                href="https://maps.google.com"
                className="flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground hover:underline"
              >
                {place.address}
                <ExternalLink className="size-4" />
              </Link>
            )}
            {place.coordinates && (
              <Link
                href="https://maps.google.com"
                className="flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground hover:underline"
              >
                Go to coordinates
                <ExternalLink className="size-4" />
              </Link>
            )}
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
