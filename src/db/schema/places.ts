import { relations } from "drizzle-orm";
import { boolean, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const placeCategories = pgTable("place_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name").notNull(),
});

export const places = pgTable("places", {
  id: uuid("id").defaultRandom().primaryKey(),
  categoryId: uuid("category_id").references(() => placeCategories.id),
  name: varchar("name").notNull(),
  address: varchar("address").notNull(),
  isVisited: boolean("is_visited").notNull().default(false),
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
