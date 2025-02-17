import { transactions } from "@/db/schema/accounting";
import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const cars = pgTable("mobility_cars", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: varchar("user_id").notNull(),
  year: integer("year").notNull(),
  make: varchar("make").notNull(),
  model: varchar("model").notNull(),
});

export const refuelings = pgTable("mobility_refuelings", {
  id: uuid("id").defaultRandom().primaryKey(),
  transactionId: uuid("transaction_id")
    .notNull()
    .references(() => transactions.id),
  carId: uuid("car_id")
    .notNull()
    .references(() => cars.id),
  ron: integer("ron").notNull().default(95),
  quantity: numeric("quantity").notNull(),
  price: numeric("price").notNull(),
  isFull: boolean("is_full").notNull().default(false),
  isNecessary: boolean("is_necessary").notNull().default(true),
  trip: numeric("trip"),
  odometer: numeric("odometer").notNull(),
});

export const highwayTrips = pgTable("mobility_highway_trips", {
  id: uuid("id").defaultRandom().primaryKey(),
  transactionId: uuid("transaction_id").references(() => transactions.id),
  carId: uuid("car_id")
    .notNull()
    .references(() => cars.id),
  startingToll: varchar("starting_toll").notNull(),
  endingToll: varchar("ending_toll").notNull(),
  distance: numeric("distance").notNull(),
  avgSpeed: numeric("avg_speed"),
});

export const services = pgTable("mobility_services", {
  id: uuid("id").defaultRandom().primaryKey(),
  carId: uuid("car_id")
    .notNull()
    .references(() => cars.id),
  datetime: timestamp("datetime", { withTimezone: true }).notNull().defaultNow(),
  odometer: numeric("odometer").notNull(),
  notes: text("notes"),
});

export const inspections = pgTable("mobility_inspections", {
  id: uuid("id").defaultRandom().primaryKey(),
  carId: uuid("car_id")
    .notNull()
    .references(() => cars.id),
  datetime: timestamp("datetime", { withTimezone: true }).notNull().defaultNow(),
  odometer: numeric("odometer").notNull(),
  isSuccessful: boolean("is_successful").notNull().default(true),
});

export const carRelations = relations(cars, ({ many }) => ({
  refuelings: many(refuelings),
  highwayTrips: many(highwayTrips),
  services: many(services),
  inspections: many(inspections),
}));

export const refuelingRelations = relations(refuelings, ({ one }) => ({
  car: one(cars, {
    fields: [refuelings.carId],
    references: [cars.id],
  }),
  transaction: one(transactions, {
    fields: [refuelings.transactionId],
    references: [transactions.id],
  }),
}));

export const highwayTripRelations = relations(highwayTrips, ({ one }) => ({
  car: one(cars, {
    fields: [highwayTrips.carId],
    references: [cars.id],
  }),
  transaction: one(transactions, {
    fields: [highwayTrips.transactionId],
    references: [transactions.id],
  }),
}));

export const serviceRelations = relations(services, ({ one }) => ({
  car: one(cars, {
    fields: [services.carId],
    references: [cars.id],
  }),
}));

export const inspectionRelations = relations(inspections, ({ one }) => ({
  car: one(cars, {
    fields: [inspections.carId],
    references: [cars.id],
  }),
}));
