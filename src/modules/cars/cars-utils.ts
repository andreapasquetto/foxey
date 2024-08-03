import { RefuelingRead } from "@/modules/cars/schemas/refueling-read-schema";
import { isSameMonth, isSameYear, startOfMonth, startOfToday, startOfYear, sub } from "date-fns";
import { Decimal } from "decimal.js";

export function extractRefuelingPeriods(refuelings: RefuelingRead[]) {
  const today = startOfToday();
  const startOfThisMonth = startOfMonth(today);
  const startOfLastMonth = startOfMonth(sub(today, { months: 1 }));
  const startOfLastYear = startOfYear(sub(today, { years: 1 }));

  return {
    thisMonth: refuelings.filter((refueling) => isSameMonth(refueling.date, startOfThisMonth)),
    lastMonth: refuelings.filter((refueling) => isSameMonth(refueling.date, startOfLastMonth)),
    lastYear: refuelings?.filter((refueling) => isSameYear(refueling.date, startOfLastYear)),
  };
}

export function calculateMonthlyCost(refuelings: RefuelingRead[]) {
  return refuelings.reduce((prev, curr) => prev.add(curr.cost), new Decimal(0)).toNumber();
}

export function getEligibleTrips(refuelings: RefuelingRead[]) {
  return refuelings.filter((refueling) => refueling.trip !== null);
}

export function calculateTotalDistance(refuelings: RefuelingRead[]) {
  return refuelings.reduce((prev, curr) => prev.add(curr.trip ?? 0), new Decimal(0)).toNumber();
}

export function calculateAvgDistance(refuelings: RefuelingRead[]) {
  const numberOfTrips = getEligibleTrips(refuelings).length;

  return refuelings
    .reduce((prev, curr) => prev.add(curr.trip ?? 0), new Decimal(0))
    .div(numberOfTrips)
    .toDecimalPlaces(2)
    .toNumber();
}

export function calculateFuelEconomy(refuelings: RefuelingRead[]) {
  const lastRefueling = refuelings.at(-1);
  const secondLastRefueling = refuelings.at(-2);

  if (!lastRefueling || !secondLastRefueling || lastRefueling?.trip === null) {
    return null;
  }

  return new Decimal(lastRefueling.trip)
    .div(secondLastRefueling.quantity)
    .toDecimalPlaces(2)
    .toNumber();
}
