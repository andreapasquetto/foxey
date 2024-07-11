import { relations } from "drizzle-orm";
import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const eventCategories = pgTable("event_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name").notNull(),
});

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  categoryId: uuid("category_id").references(() => eventCategories.id),
  isCanceled: boolean("is_canceled").default(false),
  isAllDay: boolean("is_all_day").notNull(),
  startDatetime: timestamp("start_datetime").notNull(),
  endDatetime: timestamp("end_datetime"),
  title: varchar("title").notNull(),
  description: varchar("description"),
});

export const eventCategoryRelations = relations(eventCategories, ({ many }) => ({
  events: many(events),
}));

export const eventRelations = relations(events, ({ one }) => ({
  eventCategories: one(eventCategories, {
    fields: [events.categoryId],
    references: [eventCategories.id],
  }),
}));
