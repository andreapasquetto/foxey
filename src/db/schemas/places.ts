import { relations } from "drizzle-orm";
import { boolean, pgTable, point, uuid, varchar } from "drizzle-orm/pg-core";

export const placeCategories = pgTable("place_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: varchar("user_id").notNull(),
  name: varchar("name").notNull(),
});

export const places = pgTable("places", {
  id: uuid("id").defaultRandom().primaryKey(),

  // ! this creates redundancy, it could be dropped in favor of categoryId
  // ! however, to keep the code simple, it has been added here to avoid some joins
  userId: varchar("user_id").notNull(),

  categoryId: uuid("category_id").references(() => placeCategories.id),
  name: varchar("name").notNull(),
  coordinates: point("coordinates"),
  address: varchar("address"),
  isVisited: boolean("is_visited").notNull().default(false),
});

export const placeCategoryRelations = relations(
  placeCategories,
  ({ many }) => ({
    places: many(places),
  }),
);

export const placeRelations = relations(places, ({ one }) => ({
  category: one(placeCategories, {
    fields: [places.categoryId],
    references: [placeCategories.id],
  }),
}));
