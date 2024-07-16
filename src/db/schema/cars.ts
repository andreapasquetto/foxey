import { relations } from "drizzle-orm";
import { boolean, date, integer, numeric, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const cars = pgTable("cars", {
  id: uuid("id").defaultRandom().primaryKey(),
  year: integer("year").notNull(),
  make: varchar("make").notNull(),
  model: varchar("model").notNull(),
});

// TODO: add transactionId for tracking the payment of a refueling
export const refuelings = pgTable("refuelings", {
  id: uuid("id").defaultRandom().primaryKey(),
  carId: uuid("car_id")
    .notNull()
    .references(() => cars.id),
  ron: integer("ron").default(95),
  date: date("date").notNull().defaultNow(),
  place: varchar("place").notNull(),
  cost: numeric("cost").notNull(),
  quantity: numeric("quantity").notNull(),
  price: numeric("price").notNull(),
  isFull: boolean("is_full").default(false),
  isNecessary: boolean("is_necessary").default(true),
  trip: numeric("trip"),
  odometer: numeric("odometer").notNull(),
});

// TODO: add a transactionId for tracking the payment of a trip
export const highwayTrips = pgTable("highway_trips", {
  id: uuid("id").defaultRandom().primaryKey(),
  carId: uuid("car_id")
    .notNull()
    .references(() => cars.id),
  date: date("date").notNull().defaultNow(),
  startingToll: varchar("starting_toll").notNull(),
  endingToll: varchar("ending_toll").notNull(),
  distance: numeric("distance").notNull(),
  cost: numeric("cost").notNull(),
  avgSpeed: numeric("avg_speed"),
});

export const carRelations = relations(cars, ({ many }) => ({
  refuelings: many(refuelings),
  highwayTrips: many(highwayTrips),
}));

export const refuelingRelations = relations(refuelings, ({ one }) => ({
  cars: one(cars, {
    fields: [refuelings.carId],
    references: [cars.id],
  }),
}));

export const highwayTripRelations = relations(highwayTrips, ({ one }) => ({
  cars: one(cars, {
    fields: [highwayTrips.carId],
    references: [cars.id],
  }),
}));
