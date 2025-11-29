"use client";

import { Calculator } from "lucide-react";
import { useState } from "react";
import {
  currencyFormatter,
  numberFormatter,
  percentageFormatter,
} from "@/common/formatters";
import { calculatePercentageChange } from "@/common/utils/math";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import type { Inspection, Refueling, Service } from "@/db/types/mobility";
import { cn } from "@/lib/utils";
import { FuelPriceChart } from "@/modules/mobility/components/charts/fuel-price-chart";
import { OdometerChart } from "@/modules/mobility/components/charts/odometer-chart";
import {
  calculateAvgDistanceBeforeRefueling,
  calculateAvgFuelConsumption,
  calculateCumulativeDistance,
  calculateFuelConsumption,
  calculateFuelCost,
  calculatePricePerDistance,
  extractRefuelingPeriods,
} from "@/modules/mobility/mobility-utils";

export function CarStats(props: {
  refuelings: Refueling[];
  services: Service[];
  inspections: Inspection[];
}) {
  const { refuelings, services, inspections } = props;
  const [fuelConsumptionFormat, setFuelConsumptionFormat] = useState<
    "km/L" | "L/100km"
  >("km/L");

  const refuelingPeriods = extractRefuelingPeriods(refuelings);

  const stats = {
    fuelCost: {
      thisMonth: calculateFuelCost(refuelingPeriods.thisMonth).toDecimalPlaces(
        2,
      ),
      lastMonth: calculateFuelCost(refuelingPeriods.lastMonth).toDecimalPlaces(
        2,
      ),
      thisYear: calculateFuelCost(refuelingPeriods.thisYear).toDecimalPlaces(2),
      total: calculateFuelCost(refuelings).toDecimalPlaces(2),
    },
    distance: {
      average:
        calculateAvgDistanceBeforeRefueling(refuelings)?.toDecimalPlaces(2),
      thisYear: calculateCumulativeDistance(
        refuelingPeriods.thisYear,
      )?.toDecimalPlaces(2),
      lastYear: calculateCumulativeDistance(
        refuelingPeriods.lastYear,
      )?.toDecimalPlaces(2),
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
        <Item variant="outline">
          <ItemContent>
            <ItemDescription>Monthly fuel costs</ItemDescription>
            <ItemTitle>
              {currencyFormatter.format(stats.fuelCost.thisMonth.toNumber())}
            </ItemTitle>
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
                      "text-red-500":
                        fuelCostPercentageFromLastMonth.greaterThan(0),
                      "text-green-500":
                        fuelCostPercentageFromLastMonth.lessThan(0),
                    })}
                  >
                    {percentageFormatter.format(
                      fuelCostPercentageFromLastMonth.toNumber(),
                    )}
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
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemContent>
            <ItemDescription>Average distance before refueling</ItemDescription>
            <ItemTitle>
              {stats.distance.average
                ? `${numberFormatter.format(stats.distance.average.toNumber())} km`
                : "-"}
            </ItemTitle>
            {stats.distance.thisYear && (
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground">
                  {numberFormatter.format(stats.distance.thisYear.toNumber())}{" "}
                  km{" "}
                </span>{" "}
                driven this year
              </p>
            )}
            {stats.distance.lastYear && (
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground">
                  {numberFormatter.format(stats.distance.lastYear.toNumber())}{" "}
                  km
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
          </ItemContent>
        </Item>
        <Item variant="outline" className="relative">
          <ItemContent>
            <ItemDescription>Last fuel consumption</ItemDescription>
            <ItemTitle>
              {stats.fuelConsumption.last
                ? `${numberFormatter.format(stats.fuelConsumption.last[fuelConsumptionFormat].toDecimalPlaces(2).toNumber())} ${fuelConsumptionFormat}`
                : "-"}
            </ItemTitle>
            {stats.fuelConsumption.last && (
              <Button
                variant="outline"
                size="icon"
                className="absolute top-3 right-3 text-foreground"
                onClick={() =>
                  setFuelConsumptionFormat(
                    fuelConsumptionFormat === "km/L" ? "L/100km" : "km/L",
                  )
                }
              >
                <Calculator className="size-4" />
              </Button>
            )}
            {stats.fuelConsumption.avg && (
              <p className="text-sm text-muted-foreground">
                All-time average is{" "}
                <span className="text-foreground">
                  {numberFormatter.format(
                    stats.fuelConsumption.avg[fuelConsumptionFormat]
                      .toDecimalPlaces(2)
                      .toNumber(),
                  )}{" "}
                  {fuelConsumptionFormat}
                </span>
              </p>
            )}
            {stats.fuelConsumption.pricePerDistance && (
              <p className="text-sm text-muted-foreground">
                Price/Distance ratio is{" "}
                <span className="text-foreground">
                  {numberFormatter.format(
                    stats.fuelConsumption.pricePerDistance.toNumber(),
                  )}{" "}
                  €/km
                </span>
              </p>
            )}
          </ItemContent>
        </Item>
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="space-y-3">
          <ItemTitle>Fuel price</ItemTitle>
          <FuelPriceChart refuelings={refuelings} />
        </div>
        <div className="space-y-3">
          <ItemTitle>Trend</ItemTitle>
          <OdometerChart
            refuelings={refuelings}
            services={services}
            inspections={inspections}
          />
        </div>
      </div>
    </div>
  );
}
