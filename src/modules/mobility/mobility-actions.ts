"use server";

import { Paginate, paginateToLimitAndOffset, toPaginated } from "@/common/pagination";
import { getCurrentUserId } from "@/common/utils/auth";
import { db } from "@/db/db";
import { transactions } from "@/db/schema/accounting";
import { cars, highwayTrips, inspections, refuelings, services } from "@/db/schema/mobility";
import { transactionsGetByIdsMap } from "@/modules/accounting/accounting-actions";
import { CarCreateForm } from "@/modules/mobility/schemas/car-create-form-schema";
import { HighwayTripCreateForm } from "@/modules/mobility/schemas/highway-trip-create-form-schema";
import { InspectionCreateForm } from "@/modules/mobility/schemas/inspection-create-form-schema";
import { RefuelingCreateForm } from "@/modules/mobility/schemas/refueling-create-form-schema";
import { and, desc, eq } from "drizzle-orm";

export async function carsCreate(car: CarCreateForm) {
  const userId = await getCurrentUserId();
  await db.insert(cars).values({ ...car, userId });
}

export async function carsGetAll() {
  const userId = await getCurrentUserId();
  return await db.query.cars.findMany({
    where: eq(cars.userId, userId),
  });
}

export async function carsGetById(id: string) {
  const userId = await getCurrentUserId();
  const record = await db.query.cars.findFirst({
    where: and(eq(cars.userId, userId), eq(cars.id, id)),
  });

  if (!record) {
    // TODO: return "error result" instead of throwing
    throw new Error("Not Found");
  }

  return record;
}

export async function refuelingsCreate(refueling: RefuelingCreateForm) {
  const userId = await getCurrentUserId();
  await db.transaction(async (tx) => {
    const newTransactionRecord = (
      await tx
        .insert(transactions)
        .values({
          userId,
          datetime: refueling.datetime,
          fromWalletId: refueling.walletId,
          placeId: refueling.placeId,
          amount: refueling.cost.toString(),
          description: refueling.description,
        })
        .returning({ id: transactions.id })
    )[0];

    // TODO: update wallets

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

export async function refuelingsGetAll(carId: string) {
  const records = await db
    .select()
    .from(refuelings)
    .innerJoin(transactions, eq(refuelings.transactionId, transactions.id))
    .where(eq(refuelings.carId, carId))
    .orderBy(transactions.datetime);

  const transactionIds = records.map((it) => it.transactions.id);
  const txs = await transactionsGetByIdsMap(transactionIds);

  const result = records.map((record) => ({
    ...record.mobility_refuelings,
    transaction: txs.get(record.transactions.id)!,
  }));

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

  const transactionIds = records.map((record) => record.transactions.id);
  const txs = await transactionsGetByIdsMap(transactionIds);

  const result = records.map((record) => ({
    ...record.mobility_refuelings,
    transaction: txs.get(record.transactions.id)!,
  }));

  return toPaginated(result, total);
}

export async function highwayTripsCreate(trip: HighwayTripCreateForm) {
  const userId = await getCurrentUserId();
  await db.transaction(async (tx) => {
    const newTransactionRecord = (
      await tx
        .insert(transactions)
        .values({
          userId,
          datetime: trip.datetime,
          fromWalletId: trip.walletId,
          amount: trip.cost.toString(),
          placeId: trip.placeId,
          description: trip.description ?? `${trip.startingToll} - ${trip.endingToll}`,
        })
        .returning({ id: transactions.id })
    )[0];

    // TODO: update wallets

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

  const transactionIds = records.map((it) => it.transactions.id);
  const txs = await transactionsGetByIdsMap(transactionIds);

  const result = records.map((record) => ({
    ...record.mobility_highway_trips,
    transaction: txs.get(record.transactions.id)!,
  }));

  return toPaginated(result, total);
}

export async function servicesGetAll(carId: string) {
  return await db.query.services.findMany({
    with: {
      car: true,
    },
    where: eq(services.carId, carId),
    orderBy: [services.datetime],
  });
}

export async function servicesGetPaginated(options: { paginate: Paginate; carId: string }) {
  const { limit, offset } = paginateToLimitAndOffset(options.paginate);

  const total = await countTotalServices(options.carId);
  const records = await db.query.services.findMany({
    with: {
      car: true,
    },
    where: eq(services.carId, options.carId),
    limit,
    offset,
    orderBy: [desc(services.datetime)],
  });

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
  return await db.query.inspections.findMany({
    with: {
      car: true,
    },
    where: eq(inspections.carId, carId),
    orderBy: [inspections.datetime],
  });
}

export async function inspectionsGetPaginated(options: { paginate: Paginate; carId: string }) {
  const { limit, offset } = paginateToLimitAndOffset(options.paginate);

  const total = await countTotalInspections(options.carId);
  const records = await db.query.inspections.findMany({
    with: {
      car: true,
    },
    where: eq(inspections.carId, options.carId),
    limit,
    offset,
    orderBy: desc(inspections.datetime),
  });

  return toPaginated(records, total);
}

async function countTotalRefuelings(carId: string) {
  return (
    await db.select({ id: refuelings.id }).from(refuelings).where(eq(refuelings.carId, carId))
  ).length;
}

async function countTotalHighwayTrips(carId: string) {
  return (
    await db.select({ id: highwayTrips.id }).from(highwayTrips).where(eq(highwayTrips.carId, carId))
  ).length;
}

async function countTotalServices(carId: string) {
  return (await db.select({ id: services.id }).from(services).where(eq(services.carId, carId)))
    .length;
}

async function countTotalInspections(carId: string) {
  return (
    await db.select({ id: inspections.id }).from(inspections).where(eq(inspections.carId, carId))
  ).length;
}
