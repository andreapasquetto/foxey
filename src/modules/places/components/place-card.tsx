import {
  ArrowRightLeft,
  Check,
  Edit,
  MoreHorizontal,
  SquareArrowOutUpRight,
  X,
} from "lucide-react";
import Link from "next/link";
import { placeRoute, transactionsRoute } from "@/common/routes";
import {
  buildGoogleMapsUrlWithAddress,
  buildGoogleMapsUrlWithCoordinates,
} from "@/common/utils/places";
import { CopyToClipboardButton } from "@/components/copy-to-clipboard-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import type { Place } from "@/db/types/places";
import { DeletePlace } from "@/modules/places/components/delete-place";

export function PlaceCard({ place }: { place: Place }) {
  return (
    <Item variant="outline" className="relative">
      <div className="absolute top-2 right-2 flex items-center gap-1">
        <Badge variant="outline">
          {place.isVisited ? (
            <Check className="text-green-500" />
          ) : (
            <X className="text-red-500" />
          )}
          Visited
        </Badge>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[250px]">
            <DropdownMenuItem asChild>
              <CopyToClipboardButton content={place.id} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                variant="ghost"
                className="w-full cursor-pointer items-center justify-between"
                asChild
              >
                <Link
                  href={`${transactionsRoute}?place=${place.id}`}
                  target="_blank"
                  prefetch
                >
                  See transactions <ArrowRightLeft className="text-current" />
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                variant="ghost"
                className="w-full cursor-pointer items-center justify-between"
                asChild
              >
                <Link href={placeRoute(place.id)} prefetch>
                  Edit <Edit className="text-current" />
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeletePlace place={place} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ItemContent>
        {place.category && (
          <ItemDescription>{place.category.name}</ItemDescription>
        )}
        <ItemTitle>{place.name}</ItemTitle>
        {place.address && (
          <Link
            href={buildGoogleMapsUrlWithAddress(place.address)}
            target="_blank"
            className="flex items-start gap-1 text-sm text-muted-foreground hover:text-foreground hover:underline"
          >
            {place.address}
            <SquareArrowOutUpRight className="size-3" />
          </Link>
        )}
        {place.coordinates && (
          <Link
            href={buildGoogleMapsUrlWithCoordinates(place.coordinates)}
            target="_blank"
            className="flex items-start gap-1 text-sm text-muted-foreground hover:text-foreground hover:underline"
          >
            Go to coordinates
            <SquareArrowOutUpRight className="size-3" />
          </Link>
        )}
      </ItemContent>
    </Item>
  );
}
