"use client";

import { currencyFormatter, numberFormatter, percentageFormatter } from "@/common/formatters";
import { calculatePercentageChange } from "@/common/math";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRefuelingsGetAllQuery } from "@/modules/cars/cars-queries";
import {
  calculateAvgDistance,
  calculateAvgFuelEconomy,
  calculateFuelEconomy,
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
      <>
        <div className="flex items-center justify-end gap-3">
          <CarSwitcher selectedCar={selectedCar} onSelectCar={setSelectedCar} />
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Select a car to see its statistics.
        </p>
      </>
    );
  }

  if (refuelingsQuery.isFetching) {
    return (
      <>
        <div className="flex items-center justify-end gap-3">
          <CarSwitcher selectedCar={selectedCar} onSelectCar={setSelectedCar} />
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div>
              <CardHeader className="pb-2">
                <CardDescription>Monthly fuel costs</CardDescription>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-5 w-14 rounded-full" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-28" />
              </CardContent>
            </div>
            <div>
              <CardHeader className="pb-2">
                <CardDescription>Average distance before refueling</CardDescription>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-5 w-14 rounded-full" />
                </div>
              </CardHeader>
              <CardContent className="space-y-1">
                <Skeleton className="h-4 w-28" />
              </CardContent>
            </div>
            <div>
              <CardHeader className="pb-2">
                <CardDescription>Last fuel economy</CardDescription>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-5 w-14 rounded-full" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-28" />
              </CardContent>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <div className="space-y-3">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-[380px] w-full" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-[380px] w-full" />
            </div>
          </div>
        </div>
      </>
    );
  }

  const allRefuelings = refuelingsQuery.data ?? [];

  if (!allRefuelings.length) {
    return (
      <>
        <div className="flex items-center justify-end gap-3">
          <CarSwitcher selectedCar={selectedCar} onSelectCar={setSelectedCar} />
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="relative h-[125px] overflow-hidden rounded-md border border-dashed">
              <CardHeader className="pb-2">
                <CardDescription>Monthly fuel costs</CardDescription>
              </CardHeader>
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-neutral-950/95 from-95% to-neutral-950 p-2">
                <p className="text-sm text-muted-foreground">Not enough data.</p>
              </div>
            </div>
            <div className="relative h-[125px] overflow-hidden rounded-md border border-dashed">
              <CardHeader className="pb-2">
                <CardDescription>Average distance before refueling</CardDescription>
              </CardHeader>
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-neutral-950/95 from-95% to-neutral-950 p-2">
                <p className="text-sm text-muted-foreground">Not enough data.</p>
              </div>
            </div>
            <div className="relative h-[125px] overflow-hidden rounded-md border border-dashed">
              <CardHeader className="pb-2">
                <CardDescription>Last fuel economy</CardDescription>
              </CardHeader>
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-neutral-950/95 from-95% to-neutral-950 p-2">
                <p className="text-sm text-muted-foreground">Not enough data.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <div className="space-y-3">
              <CardTitle>Fuel price</CardTitle>
              <div className="relative h-[380px] overflow-hidden rounded-md border border-dashed">
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-neutral-950/95 from-10% to-neutral-950 p-2">
                  <p className="text-sm text-muted-foreground">Not enough data.</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <CardTitle>Odometer</CardTitle>
              <div className="relative h-[380px] overflow-hidden rounded-md border border-dashed">
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-neutral-950/95 from-10% to-neutral-950 p-2">
                  <p className="text-sm text-muted-foreground">Not enough data.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

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
      last: calculateFuelEconomy(allRefuelings.at(-1), allRefuelings.at(-2)),
      avg: calculateAvgFuelEconomy(allRefuelings),
    },
  };

  return (
    <>
      <div className="flex items-center justify-end gap-3">
        <CarSwitcher selectedCar={selectedCar} onSelectCar={setSelectedCar} />
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <div>
            <CardHeader className="pb-2">
              <CardDescription>Monthly fuel costs</CardDescription>
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
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {currencyFormatter.format(stats.fuelCosts.lastMonth)} last month
              </p>
            </CardContent>
          </div>
          <div>
            <CardHeader className="pb-2">
              <CardDescription>Average distance before refueling</CardDescription>
              <CardTitle>
                {`${stats.distance.average ? numberFormatter.format(stats.distance.average) : "-"} km`}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {!!stats.distance.thisYear && !!stats.distance.lastYear && (
                <>
                  <p className="text-xs text-muted-foreground">
                    {`${numberFormatter.format(stats.distance.thisYear)} km driven so far this year`}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {`${numberFormatter.format(stats.distance.lastYear)} km last year`}
                  </p>
                </>
              )}
              {!!stats.distance.total && (
                <p className="text-xs text-muted-foreground">
                  {`${numberFormatter.format(stats.distance.total)} km in total`}
                </p>
              )}
            </CardContent>
          </div>
          <div>
            <CardHeader className="pb-2">
              <CardDescription>Last fuel economy</CardDescription>
              <CardTitle>
                {stats.fuelEconomy.last ? numberFormatter.format(stats.fuelEconomy.last) : "-"} km/l
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.fuelEconomy.avg && (
                <p className="text-xs text-muted-foreground">
                  All-time average is {numberFormatter.format(stats.fuelEconomy.avg)} km/l
                </p>
              )}
            </CardContent>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <FuelPriceChart refuelings={allRefuelings} />
          <OdometerChart refuelings={allRefuelings} />
        </div>
      </div>
    </>
  );
}
