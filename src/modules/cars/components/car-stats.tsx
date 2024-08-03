import { currencyFormatter, numberFormatter, percentageFormatter } from "@/common/formatters";
import { calculatePercentageChange } from "@/common/math";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRefuelingsGetAllQuery } from "@/modules/cars/cars-queries";
import {
  calculateAvgDistance,
  calculateFuelEconomy,
  calculateMonthlyCost,
  calculateTotalDistance,
  extractRefuelingPeriods,
} from "@/modules/cars/cars-utils";

interface RefuelingStatsProps {
  carId: string | undefined;
}

export default function CarStats(props: RefuelingStatsProps) {
  const refuelingsQuery = useRefuelingsGetAllQuery(props.carId);

  if (!props.carId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-muted-foreground">
            Select a car to see its statistics.
          </p>
        </CardContent>
      </Card>
    );
  }

  const refuelings = extractRefuelingPeriods(refuelingsQuery.data ?? []);

  const stats = {
    fuelCosts: {
      thisMonth: calculateMonthlyCost(refuelings.thisMonth),
      lastMonth: calculateMonthlyCost(refuelings.lastMonth),
    },
    distance: {
      average: calculateAvgDistance(refuelings.thisMonth),
      lastYear: calculateTotalDistance(refuelings.lastYear),
    },
    fuelEconomy: {
      last: calculateFuelEconomy(refuelings.lastMonth),
    },
  };

  if (!true) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-muted-foreground">
            Statistics are not available for the selected car.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Monthly fuel costs</CardDescription>
          {refuelingsQuery.isFetching && (
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-10" />
            </div>
          )}
          {!refuelingsQuery.isFetching && (
            <CardTitle className="flex items-center gap-2">
              {currencyFormatter.format(stats.fuelCosts.thisMonth)}
              <Badge variant="outline">
                {percentageFormatter.format(
                  calculatePercentageChange(
                    stats.fuelCosts.lastMonth,
                    stats.fuelCosts.thisMonth,
                  ).toNumber(),
                )}
              </Badge>
            </CardTitle>
          )}
        </CardHeader>
        <CardContent>
          {refuelingsQuery.isFetching && <Skeleton className="h-4 w-28" />}
          {!refuelingsQuery.isFetching && (
            <p className="text-xs text-muted-foreground">
              {currencyFormatter.format(stats.fuelCosts.lastMonth)} last month
            </p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Avg. distance before refueling</CardDescription>
          {refuelingsQuery.isFetching && (
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-10" />
            </div>
          )}
          {!refuelingsQuery.isFetching && (
            <CardTitle>{numberFormatter.format(stats.distance.average)} km</CardTitle>
          )}
        </CardHeader>
        <CardContent>
          {refuelingsQuery.isFetching && <Skeleton className="h-4 w-28" />}
          {!refuelingsQuery.isFetching && (
            <p className="text-xs text-muted-foreground">
              {numberFormatter.format(stats.distance.lastYear)} km in the last year
            </p>
          )}
        </CardContent>
      </Card>
      <Card className="pb-6 lg:pb-0">
        <CardHeader className="pb-2">
          <CardDescription>Last fuel economy</CardDescription>
          {refuelingsQuery.isFetching && (
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-10" />
            </div>
          )}
          {!refuelingsQuery.isFetching && (
            <CardTitle>
              {stats.fuelEconomy.last ? numberFormatter.format(stats.fuelEconomy.last) : "-"} km/l
            </CardTitle>
          )}
        </CardHeader>
      </Card>
    </div>
  );
}
