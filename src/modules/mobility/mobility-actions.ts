"use server";

import { Paginate, paginateToLimitAndOffset, toPaginated } from "@/common/pagination";
import { getCurrentUserId } from "@/common/utils/auth";
import { db } from "@/db/db";
import { transactions } from "@/db/schema/accounting";
import { cars, highwayTrips, inspections, refuelings, services } from "@/db/schema/mobility";
import { transactionGetById } from "@/modules/accounting/accounting-actions";
import { CarCreateForm } from "@/modules/mobility/schemas/car-create-form-schema";
import { HighwayTripCreateForm } from "@/modules/mobility/schemas/highway-trip-create-form-schema";
import { HighwayTripRead } from "@/modules/mobility/schemas/highway-trip-read-schema";
import { InspectionCreateForm } from "@/modules/mobility/schemas/inspection-create-form-schema";
import { RefuelingCreateForm } from "@/modules/mobility/schemas/refueling-create-form-schema";
import { RefuelingRead } from "@/modules/mobility/schemas/refueling-read-schema";
import { and, desc, eq } from "drizzle-orm";

export async function carsGetAll() {
  const userId = await getCurrentUserId();
  return await db.select().from(cars).where(eq(cars.userId, userId));
}

export async function carsGetById(id: string) {
  const userId = await getCurrentUserId();

  return (
    await db
      .select()
      .from(cars)
      .where(and(eq(cars.userId, userId), eq(cars.id, id)))
  )[0];
}

export async function carCreate(car: CarCreateForm) {
  const userId = await getCurrentUserId();
  await db.insert(cars).values({ ...car, userId });
}

export async function refuelingsGetAll(carId: string) {
  const records = await db
    .select()
    .from(refuelings)
    .innerJoin(transactions, eq(refuelings.transactionId, transactions.id))
    .where(eq(refuelings.carId, carId))
    .orderBy(transactions.datetime);

  const result: RefuelingRead[] = [];
  for (const record of records) {
    const transaction = await transactionGetById(record.transactions.id);
    result.push({
      ...record.car_refuelings,
      transaction,
    });
  }

  return result;
}

export async function refuelingsGetPaginated(options: { paginate: Paginate; carId: string }) {
  const total = await countTotalRefuelings(options.carId);
  const { limit, offset } = paginateToLimitAndOffset(options.paginate);

  const records = await db
    .select()
    .from(refuelings)
    .innerJoin(transactions, eq(refuelings.transactionId, transactions.id))
    .where(eq(refuelings.carId, options.carId))
    .limit(limit)
    .offset(offset)
    .orderBy(desc(transactions.datetime));

  const result: RefuelingRead[] = [];
  for (const record of records) {
    const transaction = await transactionGetById(record.transactions.id);
    result.push({
      ...record.car_refuelings,
      transaction,
    });
  }

  return toPaginated(result, total);
}

export async function refuelingCreate(refueling: RefuelingCreateForm) {
  const car = await carsGetById(refueling.carId);

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

export async function highwayTripsGetPaginated(options: { paginate: Paginate; carId: string }) {
  const total = await countTotalHighwayTrips(options.carId);
  const { limit, offset } = paginateToLimitAndOffset(options.paginate);

  const records = await db
    .select()
    .from(highwayTrips)
    .innerJoin(transactions, eq(highwayTrips.transactionId, transactions.id))
    .where(eq(highwayTrips.carId, options.carId))
    .limit(limit)
    .offset(offset)
    .orderBy(desc(transactions.datetime));

  const result: HighwayTripRead[] = [];
  for (const record of records) {
    const transaction = await transactionGetById(record.transactions.id);
    result.push({
      ...record.car_highway_trips,
      transaction,
    });
  }

  return toPaginated(result, total);
}

export async function highwayTripCreate(trip: HighwayTripCreateForm) {
  await db.transaction(async (tx) => {
    const newTransactionRecord = (
      await tx
        .insert(transactions)
        .values({
          datetime: trip.datetime,
          fromWalletId: trip.walletId,
          amount: trip.cost.toString(),
          placeId: trip.placeId,
          description: trip.description ?? `${trip.startingToll} - ${trip.endingToll}`,
        })
        .returning({ id: transactions.id })
    )[0];

    await tx.insert(highwayTrips).values({
      carId: trip.carId,
      transactionId: newTransactionRecord.id,
      startingToll: trip.startingToll,
      endingToll: trip.endingToll,
      distance: String(trip.distance),
      avgSpeed: String(trip.avgSpeed),
    });
  });
}

export async function servicesGetAll(carId: string) {
  return await db
    .select()
    .from(services)
    .where(carId ? eq(services.carId, carId) : undefined)
    .orderBy(services.datetime);
}

export async function servicesGetPaginated(options: { paginate: Paginate; carId: string }) {
  const total = await countTotalServices(options.carId);
  const { limit, offset } = paginateToLimitAndOffset(options.paginate);

  const records = await db
    .select()
    .from(services)
    .where(eq(services.carId, options.carId))
    .limit(limit)
    .offset(offset)
    .orderBy(desc(services.datetime));

  return toPaginated(records, total);
}

export async function inspectionsCreate(inspection: InspectionCreateForm) {
  await db.insert(inspections).values({
    datetime: inspection.datetime,
    carId: inspection.carId,
    odometer: String(inspection.odometer),
    isSuccessful: true,
  });
}

export async function inspectionsGetAll(carId: string) {
  return await db
    .select()
    .from(inspections)
    .where(eq(inspections.carId, carId))
    .orderBy(inspections.datetime);
}

export async function inspectionsGetPaginated(options: { paginate: Paginate; carId: string }) {
  const total = await countTotalInspections(options.carId);
  const { limit, offset } = paginateToLimitAndOffset(options.paginate);

  const records = await db
    .select()
    .from(inspections)
    .where(eq(inspections.carId, options.carId))
    .limit(limit)
    .offset(offset)
    .orderBy(desc(inspections.datetime));

  return toPaginated(records, total);
}

async function countTotalRefuelings(carId: string) {
  const totalRecordsQB = db.select().from(refuelings);
  if (carId) {
    totalRecordsQB.where(eq(refuelings.carId, carId));
  }
  return (await totalRecordsQB).length;
}

async function countTotalServices(carId: string) {
  const totalRecordsQB = db.select().from(services);
  if (carId) {
    totalRecordsQB.where(eq(services.carId, carId));
  }
  return (await totalRecordsQB).length;
}

async function countTotalHighwayTrips(carId: string) {
  const totalRecordsQB = db.select().from(highwayTrips);
  if (carId) {
    totalRecordsQB.where(eq(highwayTrips.carId, carId));
  }
  return (await totalRecordsQB).length;
}

async function countTotalInspections(carId: string) {
  const totalRecordsQB = db.select().from(inspections);
  if (carId) {
    totalRecordsQB.where(eq(inspections.carId, carId));
  }
  return (await totalRecordsQB).length;
}
