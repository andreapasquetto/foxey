import { RefuelingRead } from "@/modules/cars/schemas/refueling-read-schema";
import { isSameMonth, isSameYear, startOfMonth, startOfToday, startOfYear, sub } from "date-fns";
import { Decimal } from "decimal.js";

export function extractRefuelingPeriods(refuelings: RefuelingRead[]) {
  const today = startOfToday();
  const startOfLastMonth = startOfMonth(sub(today, { months: 1 }));
  const startOfLastYear = startOfYear(sub(today, { years: 1 }));

  return {
    thisMonth: refuelings.filter((refueling) => isSameMonth(refueling.datetime, today)),
    lastMonth: refuelings.filter((refueling) => isSameMonth(refueling.datetime, startOfLastMonth)),
    thisYear: refuelings.filter((refueling) => isSameYear(refueling.datetime, today)),
    lastYear: refuelings?.filter((refueling) => isSameYear(refueling.datetime, startOfLastYear)),
  };
}

export function calculateMonthlyCost(refuelings: RefuelingRead[]) {
  return refuelings.reduce((prev, curr) => prev.add(curr.cost), new Decimal(0)).toNumber();
}

export function getEligibleRefuelings(refuelings: RefuelingRead[]) {
  return refuelings.filter((refueling) => refueling.trip !== null);
}

export function calculateTotalDistance(refuelings: RefuelingRead[]) {
  return refuelings.reduce((prev, curr) => prev.add(curr.trip ?? 0), new Decimal(0)).toNumber();
}

export function calculateAvgDistance(refuelings: RefuelingRead[]) {
  const numberOfTrips = getEligibleRefuelings(refuelings).length;
  if (!numberOfTrips) return null;

  return refuelings
    .reduce((prev, curr) => prev.add(curr.trip ?? 0), new Decimal(0))
    .div(numberOfTrips)
    .toDecimalPlaces(2)
    .toNumber();
}

export function calculateFuelEconomy(
  refuelingA: RefuelingRead | undefined,
  refuelingB: RefuelingRead | undefined,
) {
  if (!refuelingA || !refuelingB || refuelingA?.trip === null) {
    return null;
  }
  return new Decimal(refuelingA.trip).div(refuelingB.quantity).toDecimalPlaces(2).toNumber();
}

// TODO: result is not reliable because calculations does NOT handle non-necessary refuelings differently
export function calculateAvgFuelEconomy(refuelings: RefuelingRead[]) {
  if (refuelings.length < 2) return null;

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

  return totalDistance.div(totalQuantity).toDecimalPlaces(2).toNumber();
}
