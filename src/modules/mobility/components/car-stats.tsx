"use client";

import { currencyFormatter, numberFormatter, percentageFormatter } from "@/common/formatters";
import { calculatePercentageChange } from "@/common/utils/math";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { FuelPriceChart } from "@/modules/mobility/components/charts/fuel-price-chart";
import { OdometerChart } from "@/modules/mobility/components/charts/odometer-chart";
import {
  useInspectionsGetAllQuery,
  useRefuelingsGetAllQuery,
  useServicesGetAllQuery,
} from "@/modules/mobility/mobility-queries";
import {
  calculateAvgDistance,
  calculateAvgFuelConsumption,
  calculateFuelConsumption,
  calculatePricePerDistance,
  calculateTotalCost,
  calculateTotalDistance,
  extractRefuelingPeriods,
} from "@/modules/mobility/mobility-utils";
import { Calculator } from "lucide-react";
import { useState } from "react";

interface CarStatsProps {
  carId: string;
}

export function CarStats(props: CarStatsProps) {
  const [fuelConsumptionFormat, setFuelConsumptionFormat] = useState<"km/L" | "L/100km">("km/L");

  const refuelingsQuery = useRefuelingsGetAllQuery(props.carId);
  const servicesQuery = useServicesGetAllQuery(props.carId);
  const inspectionsQuery = useInspectionsGetAllQuery(props.carId);

  const isFetching =
    refuelingsQuery.isFetching || servicesQuery.isFetching || inspectionsQuery.isFetching;
  if (isFetching) {
    return <ComponentSkeleton />;
  }

  const refuelings = refuelingsQuery.data ?? [];
  const services = servicesQuery.data ?? [];
  const inspections = inspectionsQuery.data ?? [];

  if (!refuelings.length) {
    return <ComponentEmptyState />;
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
    fuelConsumption: {
      last: calculateFuelConsumption(refuelings.at(-1), refuelings.at(-2)),
      avg: calculateAvgFuelConsumption(refuelings),
      pricePerDistance: calculatePricePerDistance(refuelings)?.toNumber(),
    },
  };

  const fuelCostPercentageFromLastMonth = calculatePercentageChange(
    stats.fuelCosts.lastMonth,
    stats.fuelCosts.thisMonth,
  ).toNumber();

  return (
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
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground">
                {currencyFormatter.format(stats.fuelCosts.lastMonth)}
              </span>{" "}
              last month
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
          <CardContent>
            {!!stats.distance.thisYear && !!stats.distance.lastYear && (
              <>
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground">
                    {numberFormatter.format(stats.distance.thisYear)} km{" "}
                  </span>{" "}
                  driven so far this year
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground">
                    {numberFormatter.format(stats.distance.lastYear)} km
                  </span>{" "}
                  last year
                </p>
              </>
            )}
            {!!stats.distance.total && (
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground">
                  {numberFormatter.format(stats.distance.total)} km
                </span>{" "}
                in total
              </p>
            )}
          </CardContent>
        </div>
        <div>
          <CardHeader className="pb-2">
            <CardDescription className="relative">
              Last fuel consumption
              <Button
                variant="outline"
                size="sm"
                className="absolute right-0 top-0 text-foreground"
                onClick={() =>
                  setFuelConsumptionFormat(fuelConsumptionFormat === "km/L" ? "L/100km" : "km/L")
                }
              >
                <Calculator className="h-4 w-4" />
              </Button>
            </CardDescription>
            {stats.fuelConsumption.last && (
              <CardTitle>
                {fuelConsumptionFormat === "km/L" &&
                  `${numberFormatter.format(stats.fuelConsumption.last["km/L"].toDecimalPlaces(2).toNumber())} km/L`}
                {fuelConsumptionFormat === "L/100km" &&
                  `${numberFormatter.format(stats.fuelConsumption.last["L/100km"].toDecimalPlaces(2).toNumber())} L/100km`}
              </CardTitle>
            )}
            {!stats.fuelConsumption.last && "-"}
          </CardHeader>
          <CardContent>
            {stats.fuelConsumption.avg && (
              <p className="text-sm text-muted-foreground">
                All-time average is{" "}
                <span className="text-foreground">
                  {fuelConsumptionFormat === "km/L" &&
                    `${numberFormatter.format(stats.fuelConsumption.avg["km/L"].toDecimalPlaces(2).toNumber())} km/L`}
                  {fuelConsumptionFormat === "L/100km" &&
                    `${numberFormatter.format(stats.fuelConsumption.avg["L/100km"].toDecimalPlaces(2).toNumber())} L/100km`}
                </span>
              </p>
            )}
            {!!stats.fuelConsumption.pricePerDistance && (
              <p className="text-sm text-muted-foreground">
                Price/Distance ratio is{" "}
                <span className="text-foreground">{`${numberFormatter.format(stats.fuelConsumption.pricePerDistance)} €/km`}</span>
              </p>
            )}
          </CardContent>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <FuelPriceChart refuelings={refuelings} />
        <OdometerChart refuelings={refuelings} services={services} inspections={inspections} />
      </div>
    </div>
  );
}

function ComponentSkeleton() {
  return (
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
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <Skeleton className="h-4 w-28" />
          </CardContent>
        </div>
        <div>
          <CardHeader className="pb-2">
            <CardDescription>Last fuel consumption</CardDescription>
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-24" />
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
  );
}

function ComponentEmptyState() {
  return (
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
  );
}
