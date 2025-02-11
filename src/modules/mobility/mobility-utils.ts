import { InspectionRead } from "@/modules/mobility/schemas/inspection-read-schema";
import { RefuelingRead } from "@/modules/mobility/schemas/refueling-read-schema";
import { ServiceRead } from "@/modules/mobility/schemas/service-read-schema";
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

export function extractRefuelingPeriods(refuelings: RefuelingRead[]) {
  const today = startOfToday();
  const startOfLastMonth = startOfMonth(sub(today, { months: 1 }));
  const startOfLastYear = startOfYear(sub(today, { years: 1 }));

  return {
    thisMonth: refuelings.filter((refueling) => isSameMonth(refueling.transaction.datetime, today)),
    lastMonth: refuelings.filter((refueling) =>
      isSameMonth(refueling.transaction.datetime, startOfLastMonth),
    ),
    thisYear: refuelings.filter((refueling) => isSameYear(refueling.transaction.datetime, today)),
    lastYear: refuelings?.filter((refueling) =>
      isSameYear(refueling.transaction.datetime, startOfLastYear),
    ),
  };
}

export function getEligibleRefuelings(refuelings: RefuelingRead[]) {
  return refuelings.filter((refueling) => refueling.trip !== null);
}

export function calculateTotalCost(refuelings: RefuelingRead[]) {
  return refuelings.reduce((prev, curr) => prev.add(curr.transaction.amount), new Decimal(0));
}

export function calculateTotalDistance(refuelings: RefuelingRead[]) {
  if (!refuelings.length) {
    return null;
  }

  const first = new Decimal(refuelings.at(0)!.odometer);
  const last = new Decimal(refuelings.at(-1)!.odometer);

  return last.sub(first);
}

export function calculateAvgDistance(refuelings: RefuelingRead[]) {
  const numberOfTrips = getEligibleRefuelings(refuelings).length;
  if (numberOfTrips < 2) return null;

  const distance = calculateTotalDistance(refuelings);
  if (distance === null) return null;

  return distance.div(numberOfTrips);
}

export function calculateFuelConsumption(
  refuelingA: RefuelingRead | undefined,
  refuelingB: RefuelingRead | undefined,
) {
  if (!refuelingA || !refuelingB || refuelingA.trip === null) {
    return null;
  }

  const kmPerL = new Decimal(refuelingA.trip).div(refuelingB.quantity);

  return {
    "km/L": kmPerL,
    "L/100km": new Decimal(100).div(kmPerL),
  };
}

// TODO: result is not reliable because calculations DO NOT handle non-necessary refuelings differently
export function calculateAvgFuelConsumption(refuelings: RefuelingRead[]) {
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

export function calculatePricePerDistance(refuelings: RefuelingRead[]) {
  const distance = calculateTotalDistance(refuelings);
  if (!distance?.toNumber()) {
    return null;
  }
  return calculateTotalCost(refuelings).div(distance);
}

export function generateOdometerChartData(params: {
  refuelings: RefuelingRead[];
  services: ServiceRead[];
  inspections: InspectionRead[];
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
