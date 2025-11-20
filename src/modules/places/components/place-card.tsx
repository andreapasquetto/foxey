import {
  ArrowRightLeft,
  Check,
  Edit,
  ExternalLink,
  MoreHorizontal,
  X,
} from "lucide-react";
import Link from "next/link";
import { placeRoute, transactionsRoute } from "@/common/routes";
import {
  buildGoogleMapsUrlWithAddress,
  buildGoogleMapsUrlWithCoordinates,
} from "@/common/utils/places";
import { CopyToClipboardButton } from "@/components/copy-to-clipboard-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Place } from "@/db/types/places";
import { DeletePlace } from "@/modules/places/components/delete-place";

export function PlaceCard({ place }: { place: Place }) {
  return (
    <Card key={place.id} className="relative">
      <div className="absolute top-2 right-2 flex items-center gap-1">
        <div className="flex items-center gap-1 rounded-full border px-2 py-1 text-xs text-muted-foreground">
          {place.isVisited && <Check className="size-4 text-green-500" />}
          {!place.isVisited && <X className="size-4 text-red-500" />}
          Visited
        </div>
        <CopyToClipboardButton content={place.id} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[250px]">
            <DropdownMenuItem asChild>
              <Link
                href={`${transactionsRoute}?place=${place.id}`}
                className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
                target="_blank"
                prefetch
              >
                See transactions <ArrowRightLeft className="size-5" />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={placeRoute(place.id)}
                className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
                prefetch
              >
                Edit <Edit className="size-5" />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeletePlace place={place} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CardHeader>
        {place.category && (
          <CardDescription>{place.category.name}</CardDescription>
        )}
        <CardTitle>{place.name}</CardTitle>
        {place.address && (
          <Link
            href={buildGoogleMapsUrlWithAddress(place.address)}
            target="_blank"
            className="flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground hover:underline"
          >
            {place.address}
            <ExternalLink className="size-4" />
          </Link>
        )}
        {place.coordinates && (
          <Link
            href={buildGoogleMapsUrlWithCoordinates(place.coordinates)}
            target="_blank"
            className="flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground hover:underline"
          >
            Go to coordinates
            <ExternalLink className="size-4" />
          </Link>
        )}
      </CardHeader>
    </Card>
  );
}
