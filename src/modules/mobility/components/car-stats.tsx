"use client";

import { currencyFormatter, numberFormatter, percentageFormatter } from "@/common/formatters";
import { calculatePercentageChange } from "@/common/math";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { CarSwitcher } from "@/modules/mobility/components/car-switcher";
import { FuelPriceChart } from "@/modules/mobility/components/charts/fuel-price-chart";
import { OdometerChart } from "@/modules/mobility/components/charts/odometer-chart";
import {
  useRefuelingsGetAllQuery,
  useServicesGetAllQuery,
} from "@/modules/mobility/mobility-queries";
import {
  calculateAvgDistance,
  calculateAvgFuelEconomy,
  calculateFuelEconomy,
  calculatePricePerDistance,
  calculateTotalCost,
  calculateTotalDistance,
  extractRefuelingPeriods,
} from "@/modules/mobility/mobility-utils";
import { CarRead } from "@/modules/mobility/schemas/car-read-schema";
import { useState } from "react";

export default function CarStats() {
  const [selectedCar, setSelectedCar] = useState<CarRead | undefined>(undefined);

  const refuelingsQuery = useRefuelingsGetAllQuery(selectedCar?.id);
  const servicesQuery = useServicesGetAllQuery(selectedCar?.id);

  if (!selectedCar) {
    return (
      <>
        <div className="sm:flex sm:items-center sm:justify-end sm:gap-3">
          <div className="sm:w-[250px]">
            <CarSwitcher selectedCar={selectedCar} onSelectCar={setSelectedCar} />
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Select a car to see its statistics.
        </p>
      </>
    );
  }

  const isFetching = refuelingsQuery.isFetching || servicesQuery.isFetching;
  if (isFetching) {
    return (
      <>
        <div className="sm:flex sm:items-center sm:justify-end sm:gap-3">
          <div className="sm:w-[250px]">
            <CarSwitcher selectedCar={selectedCar} onSelectCar={setSelectedCar} />
          </div>
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

  const refuelings = refuelingsQuery.data ?? [];
  const services = servicesQuery.data ?? [];

  if (!refuelings.length) {
    return (
      <>
        <div className="sm:flex sm:items-center sm:justify-end sm:gap-3">
          <div className="sm:w-[250px]">
            <CarSwitcher selectedCar={selectedCar} onSelectCar={setSelectedCar} />
          </div>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="relative h-[125px] overflow-hidden rounded-md border border-dashed">
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-neutral-50/95 from-10% to-neutral-50 p-2 dark:from-neutral-950/95 dark:to-neutral-950">
                <p className="text-sm text-muted-foreground">Not enough data.</p>
              </div>
            </div>
            <div className="relative h-[125px] overflow-hidden rounded-md border border-dashed">
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-neutral-50/95 from-10% to-neutral-50 p-2 dark:from-neutral-950/95 dark:to-neutral-950">
                <p className="text-sm text-muted-foreground">Not enough data.</p>
              </div>
            </div>
            <div className="relative h-[125px] overflow-hidden rounded-md border border-dashed">
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-neutral-50/95 from-10% to-neutral-50 p-2 dark:from-neutral-950/95 dark:to-neutral-950">
                <p className="text-sm text-muted-foreground">Not enough data.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <div className="space-y-3">
              <CardTitle>Fuel price</CardTitle>
              <div className="relative h-[380px] overflow-hidden rounded-md border border-dashed">
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-neutral-50/95 from-10% to-neutral-50 p-2 dark:from-neutral-950/95 dark:to-neutral-950">
                  <p className="text-sm text-muted-foreground">Not enough data.</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <CardTitle>Odometer</CardTitle>
              <div className="relative h-[380px] overflow-hidden rounded-md border border-dashed">
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-neutral-50/95 from-10% to-neutral-50 p-2 dark:from-neutral-950/95 dark:to-neutral-950">
                  <p className="text-sm text-muted-foreground">Not enough data.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const refuelingPeriods = extractRefuelingPeriods(refuelings);

  const stats = {
    fuelCosts: {
      thisMonth: calculateTotalCost(refuelingPeriods.thisMonth).toDecimalPlaces(2).toNumber(),
      lastMonth: calculateTotalCost(refuelingPeriods.lastMonth).toDecimalPlaces(2).toNumber(),
    },
    distance: {
      average: calculateAvgDistance(refuelings)?.toDecimalPlaces(2).toNumber(),
      thisYear: calculateTotalDistance(refuelingPeriods.thisYear)?.toDecimalPlaces(2).toNumber(),
      lastYear: calculateTotalDistance(refuelingPeriods.lastYear)?.toDecimalPlaces(2).toNumber(),
      total: calculateTotalDistance(refuelings)?.toDecimalPlaces(2).toNumber(),
    },
    fuelEconomy: {
      last: calculateFuelEconomy(refuelings.at(-1), refuelings.at(-2))
        ?.toDecimalPlaces(2)
        .toNumber(),
      avg: calculateAvgFuelEconomy(refuelings)?.toDecimalPlaces(2).toNumber(),
      pricePerDistance: calculatePricePerDistance(refuelings)?.toNumber(),
    },
  };

  const fuelCostPercentageFromLastMonth = calculatePercentageChange(
    stats.fuelCosts.lastMonth,
    stats.fuelCosts.thisMonth,
  ).toNumber();

  return (
    <>
      <div className="sm:flex sm:items-center sm:justify-end sm:gap-3">
        <div className="sm:w-[250px]">
          <CarSwitcher selectedCar={selectedCar} onSelectCar={setSelectedCar} />
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <div>
            <CardHeader className="pb-2">
              <CardDescription>Monthly fuel costs</CardDescription>
              <CardTitle className="flex items-center gap-2">
                {currencyFormatter.format(stats.fuelCosts.thisMonth)}
                {stats.fuelCosts.lastMonth > 0 && !isNaN(fuelCostPercentageFromLastMonth) && (
                  <Badge
                    variant="outline"
                    className={cn({
                      "border-red-500": fuelCostPercentageFromLastMonth > 0,
                      "border-green-500": fuelCostPercentageFromLastMonth < 0,
                    })}
                  >
                    {percentageFormatter.format(fuelCostPercentageFromLastMonth)}
                  </Badge>
                )}
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
              {!!stats.fuelEconomy.pricePerDistance && (
                <p className="text-xs text-muted-foreground">
                  Price/Distance ratio is{" "}
                  {`${numberFormatter.format(stats.fuelEconomy.pricePerDistance)} €/km`}
                </p>
              )}
            </CardContent>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <FuelPriceChart refuelings={refuelings} />
          <OdometerChart refuelings={refuelings} services={services} />
        </div>
      </div>
    </>
  );
}
