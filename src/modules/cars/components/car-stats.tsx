"use client";

import { currencyFormatter, numberFormatter, percentageFormatter } from "@/common/formatters";
import { calculatePercentageChange } from "@/common/math";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRefuelingsGetAllQuery } from "@/modules/cars/cars-queries";
import {
  calculateAvgDistance,
  calculateAvgFuelEconomy,
  calculateLastFuelEconomy,
  calculateMonthlyCost,
  calculateTotalDistance,
  extractRefuelingPeriods,
} from "@/modules/cars/cars-utils";
import { CarSwitcher } from "@/modules/cars/components/car-switcher";
import { FuelPriceChart } from "@/modules/cars/components/charts/fuel-price-chart";
import { OdometerChart } from "@/modules/cars/components/charts/odometer-chart";
import { CarRead } from "@/modules/cars/schemas/car-read-schema";
import { useState } from "react";

export default function CarStats() {
  const [selectedCar, setSelectedCar] = useState<CarRead | undefined>(undefined);

  const refuelingsQuery = useRefuelingsGetAllQuery(selectedCar?.id);

  if (!selectedCar) {
    return (
      <Card>
        <CardHeader>
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Stats</CardTitle>
            <CarSwitcher selectedCar={selectedCar} onSelectCar={setSelectedCar} />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-muted-foreground">
            Select a car to see its statistics.
          </p>
        </CardContent>
      </Card>
    );
  }

  const allRefuelings = refuelingsQuery.data ?? [];
  const refuelingPeriods = extractRefuelingPeriods(allRefuelings);

  const stats = {
    fuelCosts: {
      thisMonth: calculateMonthlyCost(refuelingPeriods.thisMonth),
      lastMonth: calculateMonthlyCost(refuelingPeriods.lastMonth),
    },
    distance: {
      average: calculateAvgDistance(allRefuelings),
      thisYear: calculateTotalDistance(refuelingPeriods.thisYear),
      lastYear: calculateTotalDistance(refuelingPeriods.lastYear),
      total: calculateTotalDistance(allRefuelings),
    },
    fuelEconomy: {
      last: calculateLastFuelEconomy(allRefuelings.at(-1), allRefuelings.at(-2)),
      avg: calculateAvgFuelEconomy(allRefuelings),
    },
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col justify-center gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Stats</CardTitle>
          <CarSwitcher selectedCar={selectedCar} onSelectCar={setSelectedCar} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
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
              <CardContent className="space-y-1">
                {refuelingsQuery.isFetching && <Skeleton className="h-4 w-28" />}
                {!refuelingsQuery.isFetching &&
                  stats.distance.thisYear &&
                  stats.distance.lastYear && (
                    <p className="text-xs text-muted-foreground">
                      {`${numberFormatter.format(stats.distance.thisYear)} km so far this year, ${numberFormatter.format(stats.distance.lastYear)} km last year`}
                    </p>
                  )}
                {!refuelingsQuery.isFetching && stats.distance.total && (
                  <p className="text-xs text-muted-foreground">
                    {numberFormatter.format(stats.distance.total)} km in total
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
                    {stats.fuelEconomy.last ? numberFormatter.format(stats.fuelEconomy.last) : "-"}{" "}
                    km/l
                  </CardTitle>
                )}
              </CardHeader>
              <CardContent>
                {refuelingsQuery.isFetching && <Skeleton className="h-4 w-28" />}
                {!refuelingsQuery.isFetching && stats.fuelEconomy.avg && (
                  <p className="text-xs text-muted-foreground">
                    All-time average is {numberFormatter.format(stats.fuelEconomy.avg)} km/l
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-2">
            {refuelingsQuery.isFetching && (
              <>
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-24" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-[300px] w-full" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-24" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-[300px] w-full" />
                  </CardContent>
                </Card>
              </>
            )}

            {!refuelingsQuery.isFetching && (
              <>
                <FuelPriceChart refuelings={allRefuelings} />
                <OdometerChart refuelings={allRefuelings} />
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
