import { currencyFormatter, numberFormatter } from "@/common/formatters";
import { transactionRoute } from "@/common/routes";
import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Refueling } from "@/db/types/mobility";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Banknote, Check, Coins, ExternalLink, Flame, Fuel, Route, X } from "lucide-react";
import Link from "next/link";

export function RefuelingList(props: { refuelings: Refueling[] }) {
  const { refuelings } = props;

  if (!refuelings.length) {
    return <EmptyStateMessage message="There are no refuelings for this car." />;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {refuelings
          .toReversed()
          .slice(0, 10)
          .map((refueling) => (
            <Card key={refueling.id} className="relative">
              <div className="absolute right-2 top-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={transactionRoute(refueling.transaction.id)}
                      target="_blank"
                      className={cn(
                        "flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-accent",
                      )}
                    >
                      <ExternalLink className="size-5" />
                      <span className="sr-only">Related transaction</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="top">View related transaction</TooltipContent>
                </Tooltip>
              </div>
              <CardHeader>
                <CardDescription>
                  {format(refueling.transaction.datetime, "ccc y-MM-dd HH:mm")}
                </CardDescription>
                <CardTitle>{refueling.transaction?.place?.name ?? "-"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-wrap items-center gap-x-3 text-muted-foreground sm:justify-center sm:gap-x-6">
                  <div className="flex items-center gap-1">
                    <Flame className={cn("size-4", refueling.ron > 95 && "text-orange-500")} />
                    RON {refueling.ron}
                  </div>
                  <div className="flex items-center gap-1">
                    <Coins className="size-4" />
                    {currencyFormatter.format(Number(refueling.transaction.amount))}
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
                  <div className="flex items-center gap-1 rounded-full border px-2 py-1 text-xs text-muted-foreground transition-colors">
                    {refueling.isFull ? (
                      <>
                        <Check className="size-4 text-green-500 dark:text-green-400" />
                        Full tank
                      </>
                    ) : (
                      <>
                        <X className="size-4 text-red-500 dark:text-red-400" />
                        Full tank
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-1 rounded-full border px-2 py-1 text-xs text-muted-foreground transition-colors">
                    <>
                      {refueling.isNecessary ? (
                        <Check className="size-4 text-green-500 dark:text-green-400" />
                      ) : (
                        <X className="size-4 text-red-500 dark:text-red-400" />
                      )}
                      Necessary
                    </>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </>
  );
}
