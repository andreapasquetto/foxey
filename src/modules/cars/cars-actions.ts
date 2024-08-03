"use server";

import { Paginate, paginateToLimitAndOffset, toPaginated } from "@/common/pagination";
import { db } from "@/db/db";
import { cars, highwayTrips, refuelings } from "@/db/schema/cars";
import { CarCreateForm } from "@/modules/cars/schemas/car-create-form-schema";
import { HighwayTripCreateForm } from "@/modules/cars/schemas/highway-trip-create-form-schema";
import { RefuelingCreateForm } from "@/modules/cars/schemas/refueling-create-form-schema";
import { desc, eq } from "drizzle-orm";

export async function getCars() {
  return await db.select().from(cars);
}

export async function createCar(car: CarCreateForm) {
  await db.insert(cars).values(car);
}

export async function refuelingsGetAll(carId?: string) {
  return await db
    .select()
    .from(refuelings)
    .where(carId ? eq(refuelings.carId, carId) : undefined);
}

export async function refuelingsGetPaginated(options: { paginate: Paginate; carId?: string }) {
  const total = await countTotalRefuelings(options.carId);
  const { limit, offset } = paginateToLimitAndOffset(options.paginate);
  const records = await db
    .select()
    .from(refuelings)
    .where(options.carId ? eq(refuelings.carId, options.carId) : undefined)
    .limit(limit)
    .offset(offset)
    .orderBy(desc(refuelings.date));
  return toPaginated(records, total);
}

export async function createRefueling(refueling: RefuelingCreateForm) {
  await db.insert(refuelings).values({
    carId: refueling.carId,
    place: refueling.place,
    price: String(refueling.price),
    quantity: String(refueling.quantity),
    cost: String(refueling.cost),
    isFull: refueling.isFull,
    isNecessary: refueling.isNecessary,
    trip: refueling.trip ? String(refueling.trip) : undefined,
    odometer: String(refueling.odometer),
  });
}

export async function highwayTripsGetPaginated(options: { paginate: Paginate; carId?: string }) {
  const total = await countTotalHighwayTrips(options.carId);
  const { limit, offset } = paginateToLimitAndOffset(options.paginate);
  const records = await db
    .select()
    .from(highwayTrips)
    .where(options.carId ? eq(highwayTrips.carId, options.carId) : undefined)
    .limit(limit)
    .offset(offset)
    .orderBy(highwayTrips.date);
  return toPaginated(records, total);
}

export async function createHighwayTrip(trip: HighwayTripCreateForm) {
  await db.insert(highwayTrips).values({
    carId: trip.carId,
    startingToll: trip.startingToll,
    endingToll: trip.endingToll,
    cost: String(trip.cost),
    distance: String(trip.distance),
    avgSpeed: String(trip.avgSpeed),
  });
}

async function countTotalRefuelings(carId?: string) {
  const totalRecordsQB = db.select().from(refuelings);
  if (carId) {
    totalRecordsQB.where(eq(refuelings.carId, carId));
  }
  return (await totalRecordsQB).length;
}

async function countTotalHighwayTrips(carId?: string) {
  const totalRecordsQB = db.select().from(highwayTrips);
  if (carId) {
    totalRecordsQB.where(eq(highwayTrips.carId, carId));
  }
  return (await totalRecordsQB).length;
}
