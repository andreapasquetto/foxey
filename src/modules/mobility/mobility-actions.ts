"use server";

import { Decimal } from "decimal.js";
import { and, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { carRoute, mobilityRoute } from "@/common/routes";
import { getCurrentUserId } from "@/common/utils/auth";
import { db } from "@/db/db";
import { transactions } from "@/db/schemas/finance";
import {
  cars,
  highwayTrips,
  inspections,
  refuelings,
  services,
} from "@/db/schemas/mobility";
import {
  transactionsGetByIdsMap,
  walletsUpdateAmount,
} from "@/modules/finance/finance-actions";
import type { CreateCarFormType } from "@/modules/mobility/schemas/create-car-form-schema";
import type { CreateHighwayTripFormType } from "@/modules/mobility/schemas/create-highway-trip-form-schema";
import type { CreateInspectionFormType } from "@/modules/mobility/schemas/create-inspection-form-schema";
import type { CreateRefuelingFormType } from "@/modules/mobility/schemas/create-refueling-form-schema";
import type { CreateServiceFormType } from "@/modules/mobility/schemas/create-service-form-schema";

export async function carsCreate(car: CreateCarFormType) {
  const userId = await getCurrentUserId();
  await db.insert(cars).values({ ...car, userId });
  revalidatePath(mobilityRoute);
  redirect(mobilityRoute);
}

export async function carsGetAll() {
  const userId = await getCurrentUserId();
  return await db.query.cars.findMany({
    where: eq(cars.userId, userId),
    orderBy: [desc(cars.year)],
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

export async function refuelingsCreate(params: {
  carId: string;
  refueling: CreateRefuelingFormType;
}) {
  const { carId, refueling } = params;
  const userId = await getCurrentUserId();
  await db.transaction(async (tx) => {
    const newTransaction = (
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

    if (refueling.walletId) {
      await walletsUpdateAmount(tx, {
        walletId: refueling.walletId,
        sub: new Decimal(refueling.cost),
      });
    }

    await tx.insert(refuelings).values({
      carId: refueling.carId,
      transactionId: newTransaction.id,
      price: String(refueling.price),
      quantity: String(refueling.quantity),
      isFull: refueling.isFull,
      isNecessary: refueling.isNecessary,
      trip: refueling.trip ? String(refueling.trip) : undefined,
      odometer: String(refueling.odometer),
    });
  });
  revalidatePath(carRoute(carId));
  redirect(carRoute(carId));
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

export async function highwayTripsCreate(params: {
  carId: string;
  trip: CreateHighwayTripFormType;
}) {
  const { carId, trip } = params;
  const userId = await getCurrentUserId();
  await db.transaction(async (tx) => {
    const newTransaction = (
      await tx
        .insert(transactions)
        .values({
          userId,
          datetime: trip.datetime,
          fromWalletId: trip.walletId,
          amount: trip.cost.toString(),
          placeId: trip.placeId,
          description: trip.description,
        })
        .returning({ id: transactions.id })
    )[0];

    if (trip.walletId) {
      await walletsUpdateAmount(tx, {
        walletId: trip.walletId,
        sub: new Decimal(trip.cost),
      });
    }

    await tx.insert(highwayTrips).values({
      carId: trip.carId,
      transactionId: newTransaction.id,
      startingToll: trip.startingToll,
      endingToll: trip.endingToll,
      distance: String(trip.distance),
      avgSpeed: String(trip.avgSpeed),
    });
  });
  revalidatePath(carRoute(carId));
  redirect(carRoute(carId));
}

export async function highwayTripsGetAll(carId: string) {
  const records = await db
    .select()
    .from(highwayTrips)
    .innerJoin(transactions, eq(highwayTrips.transactionId, transactions.id))
    .where(eq(highwayTrips.carId, carId))
    .orderBy(desc(transactions.datetime));

  const transactionIds = records.map((it) => it.transactions.id);
  const txs = await transactionsGetByIdsMap(transactionIds);

  return records.map((record) => ({
    ...record.mobility_highway_trips,
    transaction: txs.get(record.transactions.id)!,
  }));
}

export async function servicesCreate(params: {
  carId: string;
  service: CreateServiceFormType;
}) {
  const { carId, service } = params;
  await db.insert(services).values({
    carId: service.carId,
    datetime: service.datetime,
    odometer: String(service.odometer),
    notes: service.notes,
  });
  revalidatePath(carRoute(carId));
  redirect(carRoute(carId));
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

export async function inspectionsCreate(params: {
  carId: string;
  inspection: CreateInspectionFormType;
}) {
  const { carId, inspection } = params;
  await db.insert(inspections).values({
    datetime: inspection.datetime,
    carId: inspection.carId,
    odometer: String(inspection.odometer),
    isSuccessful: true,
  });
  revalidatePath(carRoute(carId));
  redirect(carRoute(carId));
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
