import { transactions } from "@/db/schema/accounting";
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

export const cars = pgTable("cars", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: varchar("user_id").notNull(),
  year: integer("year").notNull(),
  make: varchar("make").notNull(),
  model: varchar("model").notNull(),
});

export const refuelings = pgTable("car_refuelings", {
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

export const highwayTrips = pgTable("car_highway_trips", {
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

export const services = pgTable("car_services", {
  id: uuid("id").defaultRandom().primaryKey(),
  carId: uuid("car_id")
    .notNull()
    .references(() => cars.id),
  datetime: timestamp("datetime", { withTimezone: true }).notNull().defaultNow(),
  odometer: numeric("odometer").notNull(),
  notes: text("notes"),
});

export const inspections = pgTable("car_inspections", {
  id: uuid("id").defaultRandom().primaryKey(),
  carId: uuid("car_id")
    .notNull()
    .references(() => cars.id),
  datetime: timestamp("datetime", { withTimezone: true }).notNull().defaultNow(),
  odometer: numeric("odometer").notNull(),
  isSuccessful: boolean("is_successful").notNull().default(true),
});
