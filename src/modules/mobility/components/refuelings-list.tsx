import { format } from "date-fns";
import {
  Banknote,
  Check,
  Coins,
  Flame,
  Fuel,
  Route,
  SquareArrowOutUpRight,
  X,
} from "lucide-react";
import Link from "next/link";
import { currencyFormatter, numberFormatter } from "@/common/formatters";
import { transactionRoute } from "@/common/routes";
import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Refueling } from "@/db/types/mobility";
import { cn } from "@/lib/utils";

export function RefuelingsList(props: { refuelings: Refueling[] }) {
  const { refuelings } = props;

  if (!refuelings.length) {
    return (
      <EmptyStateMessage message="There are no refuelings for this car." />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {refuelings
        .toReversed()
        .slice(0, 10)
        .map((refueling) => (
          <Item key={refueling.id} variant="outline" className="relative">
            <div className="absolute top-2 right-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Link
                      href={transactionRoute(refueling.transaction.id)}
                      target="_blank"
                    >
                      <SquareArrowOutUpRight />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Go to related transaction</TooltipContent>
              </Tooltip>
            </div>
            <ItemContent>
              <ItemDescription>
                {format(refueling.transaction.datetime, "ccc y-MM-dd HH:mm")}
              </ItemDescription>
              <ItemTitle>{refueling.transaction?.place?.name ?? "-"}</ItemTitle>
              <div className="flex flex-wrap items-center gap-x-3 text-muted-foreground sm:justify-center sm:gap-x-6">
                <div className="flex items-center gap-1">
                  <Flame
                    className={cn(
                      "size-4",
                      refueling.ron > 95 && "text-orange-500",
                    )}
                  />
                  RON {refueling.ron}
                </div>
                <div className="flex items-center gap-1">
                  <Coins className="size-4" />
                  {currencyFormatter.format(
                    Number(refueling.transaction.amount),
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Fuel className="size-4" />
                  {refueling.quantity} L
                </div>
                <div className="flex items-center gap-1">
                  <Banknote className="size-4" />
                  {refueling.price} €/L
                </div>
                {refueling.trip && (
                  <div className="flex items-center gap-1">
                    <Route className="size-4" />
                    {numberFormatter.format(Number(refueling.trip))} km
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-3 text-muted-foreground sm:justify-center">
                <Badge variant="outline">
                  {refueling.isFull ? (
                    <Check className="text-green-500 dark:text-green-400" />
                  ) : (
                    <X className="text-red-500 dark:text-red-400" />
                  )}
                  Full tank
                </Badge>
                <Badge variant="outline">
                  {refueling.isNecessary ? (
                    <Check className="text-green-500 dark:text-green-400" />
                  ) : (
                    <X className="text-red-500 dark:text-red-400" />
                  )}
                  Necessary
                </Badge>
              </div>
            </ItemContent>
          </Item>
        ))}
    </div>
  );
}
