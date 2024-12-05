"use server";

import { Paginate, paginateToLimitAndOffset, toPaginated } from "@/common/pagination";
import { db } from "@/db/db";
import { transactions } from "@/db/schema/accounting";
import { cars, highwayTrips, refuelings, services } from "@/db/schema/mobility";
import { transactionGetById } from "@/modules/accounting/accounting-actions";
import { CarCreateForm } from "@/modules/mobility/schemas/car-create-form-schema";
import { HighwayTripCreateForm } from "@/modules/mobility/schemas/highway-trip-create-form-schema";
import { RefuelingCreateForm } from "@/modules/mobility/schemas/refueling-create-form-schema";
import { RefuelingRead } from "@/modules/mobility/schemas/refueling-read-schema";
import { ServiceRead } from "@/modules/mobility/schemas/service-read-schema";
import { desc, eq } from "drizzle-orm";

export async function carsGetAll() {
  return await db.select().from(cars);
}

export async function carCreate(car: CarCreateForm) {
  await db.insert(cars).values(car);
}

export async function refuelingsGetAll(carId?: string) {
  const cars = await carsGetAll();

  const records = await db
    .select()
    .from(refuelings)
    .innerJoin(transactions, eq(refuelings.transactionId, transactions.id))
    .where(carId ? eq(refuelings.carId, carId) : undefined)
    .orderBy(transactions.datetime);

  const result: RefuelingRead[] = [];
  for (const record of records) {
    const car = cars.find((c) => c.id === record.car_refuelings.carId)!;
    const transaction = await transactionGetById(record.transactions.id);
    result.push({
      ...record.car_refuelings,
      car,
      transaction,
    });
  }

  return result;
}

export async function refuelingsGetPaginated(options: { paginate: Paginate; carId?: string }) {
  const total = await countTotalRefuelings(options.carId);
  const { limit, offset } = paginateToLimitAndOffset(options.paginate);

  const cars = await carsGetAll();

  const records = await db
    .select()
    .from(refuelings)
    .innerJoin(transactions, eq(refuelings.transactionId, transactions.id))
    .where(options.carId ? eq(refuelings.carId, options.carId) : undefined)
    .limit(limit)
    .offset(offset)
    .orderBy(desc(transactions.datetime));

  const result: RefuelingRead[] = [];
  for (const record of records) {
    const car = cars.find((c) => c.id === record.car_refuelings.carId)!;
    const transaction = await transactionGetById(record.transactions.id);
    result.push({
      ...record.car_refuelings,
      car,
      transaction,
    });
  }

  return toPaginated(result, total);
}

export async function refuelingCreate(refueling: RefuelingCreateForm) {
  await db.transaction(async (tx) => {
    const newTransactionRecord = (
      await tx
        .insert(transactions)
        .values({
          datetime: refueling.datetime,
          fromWalletId: refueling.walletId,
          placeId: refueling.placeId,
          amount: refueling.cost.toString(),
          description: refueling.description,
        })
        .returning({ id: transactions.id })
    )[0];

    await tx.insert(refuelings).values({
      carId: refueling.carId,
      transactionId: newTransactionRecord.id,
      price: String(refueling.price),
      quantity: String(refueling.quantity),
      isFull: refueling.isFull,
      isNecessary: refueling.isNecessary,
      trip: refueling.trip ? String(refueling.trip) : undefined,
      odometer: String(refueling.odometer),
    });
  });
}

export async function highwayTripsGetPaginated(options: { paginate: Paginate; carId?: string }) {
  const total = await countTotalHighwayTrips(options.carId);
  const { limit, offset } = paginateToLimitAndOffset(options.paginate);
  const records = await db
    .select({
      id: highwayTrips.id,
      datetime: highwayTrips.datetime,
      startingToll: highwayTrips.startingToll,
      endingToll: highwayTrips.endingToll,
      distance: highwayTrips.distance,
      cost: highwayTrips.cost,
      avgSpeed: highwayTrips.avgSpeed,
      car: {
        make: cars.make,
        model: cars.model,
      },
    })
    .from(highwayTrips)
    .innerJoin(cars, eq(cars.id, highwayTrips.carId))
    .where(options.carId ? eq(highwayTrips.carId, options.carId) : undefined)
    .limit(limit)
    .offset(offset)
    .orderBy(desc(highwayTrips.datetime));
  return toPaginated(records, total);
}

export async function highwayTripCreate(trip: HighwayTripCreateForm) {
  await db.insert(highwayTrips).values({
    carId: trip.carId,
    datetime: trip.datetime,
    startingToll: trip.startingToll,
    endingToll: trip.endingToll,
    cost: String(trip.cost),
    distance: String(trip.distance),
    avgSpeed: String(trip.avgSpeed),
  });
}

export async function servicesGetAll(carId?: string) {
  const cars = await carsGetAll();
  const records = await db
    .select()
    .from(services)
    .where(carId ? eq(services.carId, carId) : undefined)
    .orderBy(services.datetime);

  const result: ServiceRead[] = [];
  for (const record of records) {
    const car = cars.find((c) => c.id === record.carId)!;
    result.push({ ...record, car });
  }

  return result;
}

export async function servicesGetPaginated(options: { paginate: Paginate; carId?: string }) {
  const total = await countTotalServices(options.carId);
  const { limit, offset } = paginateToLimitAndOffset(options.paginate);

  const cars = await carsGetAll();

  const records = await db
    .select()
    .from(services)
    .where(options.carId ? eq(services.carId, options.carId) : undefined)
    .limit(limit)
    .offset(offset)
    .orderBy(desc(services.datetime));

  const result: ServiceRead[] = [];
  for (const record of records) {
    const car = cars.find((c) => c.id === record.carId)!;
    result.push({ ...record, car });
  }

  return toPaginated(result, total);
}

async function countTotalRefuelings(carId?: string) {
  const totalRecordsQB = db.select().from(refuelings);
  if (carId) {
    totalRecordsQB.where(eq(refuelings.carId, carId));
  }
  return (await totalRecordsQB).length;
}

async function countTotalServices(carId?: string) {
  const totalRecordsQB = db.select().from(services);
  if (carId) {
    totalRecordsQB.where(eq(services.carId, carId));
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
