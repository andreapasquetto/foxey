import {
  isBefore,
  isSameMonth,
  isSameYear,
  startOfMonth,
  startOfToday,
  startOfYear,
  sub,
} from "date-fns";
import { Decimal } from "decimal.js";
import type { Inspection, Refueling, Service } from "@/db/types/mobility";

export function extractRefuelingPeriods(refuelings: Refueling[]) {
  const today = startOfToday();
  const startOfLastMonth = startOfMonth(sub(today, { months: 1 }));
  const startOfLastYear = startOfYear(sub(today, { years: 1 }));

  return {
    thisMonth: refuelings.filter((refueling) =>
      isSameMonth(refueling.transaction.datetime, today),
    ),
    lastMonth: refuelings.filter((refueling) =>
      isSameMonth(refueling.transaction.datetime, startOfLastMonth),
    ),
    thisYear: refuelings.filter((refueling) =>
      isSameYear(refueling.transaction.datetime, today),
    ),
    lastYear: refuelings?.filter((refueling) =>
      isSameYear(refueling.transaction.datetime, startOfLastYear),
    ),
  };
}

export function getEligibleRefuelings(refuelings: Refueling[]) {
  return refuelings.filter((refueling) => refueling.trip !== null);
}

export function calculateFuelCost(refuelings: Refueling[]) {
  return refuelings.reduce(
    (prev, curr) => prev.add(curr.transaction.amount),
    new Decimal(0),
  );
}

export function calculateCumulativeDistance(refuelings: Refueling[]) {
  if (!refuelings.length || refuelings.length < 2) {
    return null;
  }

  const first = new Decimal(refuelings.at(0)!.odometer);
  const last = new Decimal(refuelings.at(-1)!.odometer);

  return last.sub(first);
}

export function calculateAvgDistanceBeforeRefueling(refuelings: Refueling[]) {
  const distance = calculateCumulativeDistance(refuelings);
  if (distance === null) {
    return null;
  }

  const numberOfRefuelings = getEligibleRefuelings(refuelings).length;
  if (numberOfRefuelings < 2) {
    return null;
  }

  return distance.div(numberOfRefuelings);
}

export function calculateFuelConsumption(
  last: Refueling | undefined,
  secondLast: Refueling | undefined,
) {
  if (!last || !secondLast || last.trip === null) {
    return null;
  }

  const kmPerL = new Decimal(last.trip).div(secondLast.quantity);

  return {
    "km/L": kmPerL,
    "L/100km": new Decimal(100).div(kmPerL),
  };
}

// TODO: result is not reliable because calculations DO NOT handle non-necessary refuelings differently
export function calculateAvgFuelConsumption(refuelings: Refueling[]) {
  if (refuelings.length < 2) {
    return null;
  }
  const { totalQuantity, totalDistance } = refuelings.reduce(
    (acc, refueling) => {
      if (refueling.trip !== null) {
        acc.totalDistance = acc.totalDistance.add(refueling.trip);
      }
      acc.totalQuantity = acc.totalQuantity.add(refueling.quantity);
      return acc;
    },
    {
      totalDistance: new Decimal(0),
      totalQuantity: new Decimal(0),
    },
  );

  const kmPerL = totalDistance.div(totalQuantity);

  return {
    "km/L": kmPerL,
    "L/100km": new Decimal(100).div(kmPerL),
  };
}

export function calculatePricePerDistance(refuelings: Refueling[]) {
  const distance = calculateCumulativeDistance(refuelings);
  if (!distance?.toNumber()) {
    return null;
  }
  return calculateFuelCost(refuelings).div(distance);
}

export function generateOdometerChartData(params: {
  refuelings: Refueling[];
  services: Service[];
  inspections: Inspection[];
}) {
  return [
    ...params.refuelings.map((refueling) => ({
      datetime: refueling.transaction.datetime,
      refueling: Number(refueling.odometer),
    })),
    ...params.services.map((service) => ({
      datetime: service.datetime,
      service: Number(service.odometer),
    })),
    ...params.inspections.map((inspection) => ({
      datetime: inspection.datetime,
      inspection: Number(inspection.odometer),
    })),
  ].toSorted((a, b) => (isBefore(a.datetime, b.datetime) ? -1 : 1));
}
