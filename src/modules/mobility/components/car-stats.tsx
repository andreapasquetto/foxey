"use client";

import { currencyFormatter, numberFormatter, percentageFormatter } from "@/common/formatters";
import { calculatePercentageChange } from "@/common/utils/math";
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
  calculateAvgDistanceBeforeRefueling,
  calculateAvgFuelConsumption,
  calculateCumulativeDistance,
  calculateFuelConsumption,
  calculateFuelCost,
  calculatePricePerDistance,
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

  if (!refuelingsQuery.data || !servicesQuery.data || !inspectionsQuery.data) {
    return <ComponentSkeleton />;
  }

  const refuelings = refuelingsQuery.data;
  const services = servicesQuery.data;
  const inspections = inspectionsQuery.data;

  const refuelingPeriods = extractRefuelingPeriods(refuelings);

  const stats = {
    fuelCost: {
      thisMonth: calculateFuelCost(refuelingPeriods.thisMonth).toDecimalPlaces(2),
      lastMonth: calculateFuelCost(refuelingPeriods.lastMonth).toDecimalPlaces(2),
      thisYear: calculateFuelCost(refuelingPeriods.thisYear).toDecimalPlaces(2),
      total: calculateFuelCost(refuelings).toDecimalPlaces(2),
    },
    distance: {
      average: calculateAvgDistanceBeforeRefueling(refuelings)?.toDecimalPlaces(2),
      thisYear: calculateCumulativeDistance(refuelingPeriods.thisYear)?.toDecimalPlaces(2),
      lastYear: calculateCumulativeDistance(refuelingPeriods.lastYear)?.toDecimalPlaces(2),
      total: calculateCumulativeDistance(refuelings)?.toDecimalPlaces(2),
    },
    fuelConsumption: {
      last: calculateFuelConsumption(refuelings.at(-1), refuelings.at(-2)),
      avg: calculateAvgFuelConsumption(refuelings),
      pricePerDistance: calculatePricePerDistance(refuelings),
    },
  };

  const fuelCostPercentageFromLastMonth = calculatePercentageChange(
    stats.fuelCost.lastMonth,
    stats.fuelCost.thisMonth,
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <div>
          <CardHeader className="pb-2">
            <CardDescription>Monthly fuel costs</CardDescription>
            <CardTitle className="flex items-center gap-2">
              {currencyFormatter.format(stats.fuelCost.thisMonth.toNumber())}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground">
                {currencyFormatter.format(stats.fuelCost.lastMonth.toNumber())}
              </span>{" "}
              last month
              {!stats.fuelCost.lastMonth.isZero() && (
                <>
                  ,{" "}
                  <span
                    className={cn({
                      "text-red-500": fuelCostPercentageFromLastMonth.greaterThan(0),
                      "text-green-500": fuelCostPercentageFromLastMonth.lessThan(0),
                    })}
                  >
                    {percentageFormatter.format(fuelCostPercentageFromLastMonth.toNumber())}
                  </span>
                </>
              )}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground">
                {currencyFormatter.format(stats.fuelCost.thisYear.toNumber())}
              </span>{" "}
              this year
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground">
                {currencyFormatter.format(stats.fuelCost.total.toNumber())}
              </span>{" "}
              in total
            </p>
          </CardContent>
        </div>
        <div>
          <CardHeader className="pb-2">
            <CardDescription>Average distance before refueling</CardDescription>
            <CardTitle>
              {stats.distance.average
                ? numberFormatter.format(stats.distance.average.toNumber())
                : "-"}{" "}
              km
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.distance.thisYear && (
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground">
                  {numberFormatter.format(stats.distance.thisYear.toNumber())} km{" "}
                </span>{" "}
                driven this year
              </p>
            )}
            {stats.distance.lastYear && (
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground">
                  {numberFormatter.format(stats.distance.lastYear.toNumber())} km
                </span>{" "}
                driven last year
              </p>
            )}
            {stats.distance.total && (
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground">
                  {numberFormatter.format(stats.distance.total.toNumber())} km
                </span>{" "}
                driven in total
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
            <CardTitle>
              {stats.fuelConsumption.last
                ? `${numberFormatter.format(stats.fuelConsumption.last[fuelConsumptionFormat].toDecimalPlaces(2).toNumber())} ${fuelConsumptionFormat}`
                : "-"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.fuelConsumption.avg && (
              <p className="text-sm text-muted-foreground">
                All-time average is{" "}
                <span className="text-foreground">
                  {numberFormatter.format(
                    stats.fuelConsumption.avg[fuelConsumptionFormat].toDecimalPlaces(2).toNumber(),
                  )}{" "}
                  {fuelConsumptionFormat}
                </span>
              </p>
            )}
            {stats.fuelConsumption.pricePerDistance && (
              <p className="text-sm text-muted-foreground">
                Price/Distance ratio is{" "}
                <span className="text-foreground">
                  {numberFormatter.format(stats.fuelConsumption.pricePerDistance.toNumber())} €/km
                </span>
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
          <CardContent className="space-y-1">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-36" />
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
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-36" />
          </CardContent>
        </div>
        <div>
          <CardHeader className="pb-2">
            <CardDescription>Last fuel consumption</CardDescription>
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-24" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-32" />
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
