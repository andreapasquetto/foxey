import { places } from "@/db/schema/places";
import {
  AnyPgColumn,
  numeric,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const wallets = pgTable("wallets", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name").notNull(),
  initialAmount: numeric("initial_amount").notNull().default("0"),
  amount: numeric("amount").notNull().default("0"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const transactionCategories = pgTable("transaction_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name").notNull(),
  parentId: uuid("parent_id").references((): AnyPgColumn => transactionCategories.id),
});

export const transactions = pgTable("transactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  datetime: timestamp("datetime", { withTimezone: true }).notNull().defaultNow(),
  fromWalletId: uuid("from_wallet_id").references(() => wallets.id),
  toWalletId: uuid("to_wallet_id").references(() => wallets.id),
  categoryId: uuid("category_id").references(() => transactionCategories.id),
  placeId: uuid("place_id").references(() => places.id),
  amount: numeric("amount").notNull(),
  description: varchar("description"),
});

export const tags = pgTable("tags", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name").notNull(),
});

export const transactionTags = pgTable(
  "transaction_tags",
  {
    transactionId: uuid("transaction_id")
      .notNull()
      .references(() => transactions.id),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.transactionId, table.tagId] }),
  }),
);
