"use server";

import { db } from "@/db/db";
import { cars, highwayTrips, refuelings } from "@/db/schema/cars";
import { CarCreateForm } from "@/modules/cars/schemas/car-create-form-schema";
import { RefuelingCreateForm } from "@/modules/cars/schemas/refueling-create-form-schema";

export async function getCars() {
  return await db.select().from(cars);
}

export async function createCar(car: CarCreateForm) {
  await db.insert(cars).values(car);
}

export async function getRefuelings() {
  return await db.select().from(refuelings).orderBy(refuelings.date);
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

export async function getHighwayTrips() {
  return await db.select().from(highwayTrips).orderBy(highwayTrips.date);
}
