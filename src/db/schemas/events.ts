import { places } from "@/db/schemas/places";
import { relations } from "drizzle-orm";
import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const eventCategories = pgTable("event_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: varchar("user_id").notNull(),
  name: varchar("name").notNull(),
});

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),

  // ! this creates redundancy, it could be dropped in favor of categoryId
  // ! however, to keep the code simple, it has been added here to avoid some joins
  userId: varchar("user_id").notNull(),

  categoryId: uuid("category_id").references(() => eventCategories.id),
  placeId: uuid("place_id").references(() => places.id),
  isCanceled: boolean("is_canceled").notNull().default(false),
  isAllDay: boolean("is_all_day").notNull().default(false),
  datetime: timestamp("datetime", { withTimezone: true }).notNull(),
  title: varchar("title").notNull(),
  description: varchar("description"),
});

export const eventCategoryRelations = relations(eventCategories, ({ many }) => ({
  events: many(events),
}));

export const eventRelations = relations(events, ({ one }) => ({
  category: one(eventCategories, {
    fields: [events.categoryId],
    references: [eventCategories.id],
  }),
  place: one(places, {
    fields: [events.placeId],
    references: [places.id],
  }),
}));
