import { relations } from "drizzle-orm";
import { boolean, date, integer, numeric, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const cars = pgTable("cars", {
  id: uuid("id").defaultRandom().primaryKey(),
  year: integer("year").notNull(),
  make: varchar("make").notNull(),
  model: varchar("model").notNull(),
});

export const refuelings = pgTable("refuelings", {
  id: uuid("id").defaultRandom().primaryKey(),
  carId: uuid("car_id").references(() => cars.id),
  ron: integer("ron").default(95),
  date: date("date").notNull(),
  place: varchar("place").notNull(),
  cost: numeric("cost").notNull(),
  quantity: numeric("quantity").notNull(),
  price: numeric("price").notNull(),
  isFull: boolean("is_full").default(false),
  isNecessary: boolean("is_necessary").default(true),
  trip: numeric("trip"),
  odometer: numeric("odometer").notNull(),
});

export const highwayTrips = pgTable("highway_trips", {
  id: uuid("id").defaultRandom().primaryKey(),
  carId: uuid("car_id").references(() => cars.id),
  date: date("date").notNull(),
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

export const contacts = pgTable("contacts", {
  id: uuid("id").defaultRandom().primaryKey(),
  isArchived: boolean("is_archived").default(false),
  isBusiness: boolean("is_business").default(false),
  fullName: varchar("full_name").notNull(),
  subtitle: varchar("subtitle"),
  dob: date("dob"),
});

export const contactPhoneNumbers = pgTable("contact_phone_numbers", {
  id: uuid("id").defaultRandom().primaryKey(),
  contactId: uuid("contact_id").references(() => contacts.id, { onDelete: "cascade" }),
  value: varchar("value").notNull(),
  type: varchar("type"),
});

export const contactEmails = pgTable("contact_emails", {
  id: uuid("id").defaultRandom().primaryKey(),
  contactId: uuid("contact_id").references(() => contacts.id, { onDelete: "cascade" }),
  value: varchar("value").notNull(),
  type: varchar("type"),
});

export const contactAddresses = pgTable("contact_addresses", {
  id: uuid("id").defaultRandom().primaryKey(),
  contactId: uuid("contact_id").references(() => contacts.id, { onDelete: "cascade" }),
  value: varchar("value").notNull(),
  type: varchar("type"),
});

export const contactRelations = relations(contacts, ({ many }) => ({
  contactPhoneNumbers: many(contactPhoneNumbers),
  contactEmails: many(contactEmails),
  contactAddresses: many(contactAddresses),
}));

export const contactPhoneNumbersRelations = relations(contactPhoneNumbers, ({ one }) => ({
  contacts: one(contacts, {
    fields: [contactPhoneNumbers.contactId],
    references: [contacts.id],
  }),
}));

export const contactEmailsRelations = relations(contactEmails, ({ one }) => ({
  contacts: one(contacts, {
    fields: [contactEmails.contactId],
    references: [contacts.id],
  }),
}));

export const contactAddressesRelations = relations(contactAddresses, ({ one }) => ({
  contacts: one(contacts, {
    fields: [contactAddresses.contactId],
    references: [contacts.id],
  }),
}));

export const placeCategories = pgTable("place_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name").notNull(),
});

export const places = pgTable("places", {
  id: uuid("id").defaultRandom().primaryKey(),
  categoryId: uuid("category_id").references(() => placeCategories.id, { onDelete: "cascade" }),
  name: varchar("name").notNull(),
  address: varchar("address").notNull(),
  isVisited: boolean("is_visited").default(false),
});

export const placeCategoryRelations = relations(placeCategories, ({ many }) => ({
  places: many(places),
}));

export const placeRelations = relations(places, ({ one }) => ({
  placeCategories: one(placeCategories, {
    fields: [places.categoryId],
    references: [placeCategories.id],
  }),
}));
