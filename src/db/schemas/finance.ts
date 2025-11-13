import { relations } from "drizzle-orm";
import {
  boolean,
  numeric,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { places } from "@/db/schemas/places";

export const wallets = pgTable("wallets", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: varchar("user_id").notNull(),
  name: varchar("name").notNull(),
  initialAmount: numeric("initial_amount").notNull().default("0"),
  amount: numeric("amount").notNull().default("0"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  isArchived: boolean("is_archived").notNull().default(false),
});

export const transactionCategories = pgTable("transaction_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: varchar("user_id").notNull(),
  name: varchar("name").notNull(),
});

export const transactionTemplates = pgTable("transaction_templates", {
  id: uuid("id").defaultRandom().primaryKey(),

  // ! this creates redundancy, it could be dropped in favor of fromWalletId and toWalletId
  // ! however, to keep the code simple, it has been added here to avoid some joins
  userId: varchar("user_id").notNull(),

  name: varchar("name").notNull(),
  fromWalletId: uuid("from_wallet_id").references(() => wallets.id),
  toWalletId: uuid("to_wallet_id").references(() => wallets.id),
  categoryId: uuid("category_id").references(() => transactionCategories.id),
  placeId: uuid("place_id").references(() => places.id),
  amount: numeric("amount"),
});

export const transactions = pgTable("transactions", {
  id: uuid("id").defaultRandom().primaryKey(),

  // ! this creates redundancy, it could be dropped in favor of fromWalletId and toWalletId
  // ! however, to keep the code simple, it has been added here to avoid some joins
  userId: varchar("user_id").notNull(),

  datetime: timestamp("datetime", { withTimezone: true })
    .notNull()
    .defaultNow(),
  fromWalletId: uuid("from_wallet_id").references(() => wallets.id),
  toWalletId: uuid("to_wallet_id").references(() => wallets.id),
  categoryId: uuid("category_id").references(() => transactionCategories.id),
  placeId: uuid("place_id").references(() => places.id),
  amount: numeric("amount").notNull(),
  description: varchar("description"),
});

export const tags = pgTable("tags", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: varchar("user_id").notNull(),
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
  (table) => [primaryKey({ columns: [table.transactionId, table.tagId] })],
);

export const transactionTemplateRelations = relations(
  transactionTemplates,
  ({ one }) => ({
    category: one(transactionCategories, {
      fields: [transactionTemplates.categoryId],
      references: [transactionCategories.id],
    }),
    from: one(wallets, {
      fields: [transactionTemplates.fromWalletId],
      references: [wallets.id],
      relationName: "from",
    }),
    to: one(wallets, {
      fields: [transactionTemplates.toWalletId],
      references: [wallets.id],
      relationName: "to",
    }),
    place: one(places, {
      fields: [transactionTemplates.placeId],
      references: [places.id],
    }),
  }),
);

export const transactionRelations = relations(
  transactions,
  ({ one, many }) => ({
    category: one(transactionCategories, {
      fields: [transactions.categoryId],
      references: [transactionCategories.id],
    }),
    from: one(wallets, {
      fields: [transactions.fromWalletId],
      references: [wallets.id],
      relationName: "from",
    }),
    to: one(wallets, {
      fields: [transactions.toWalletId],
      references: [wallets.id],
      relationName: "to",
    }),
    place: one(places, {
      fields: [transactions.placeId],
      references: [places.id],
    }),
    tags: many(transactionTags),
  }),
);

export const tagRelations = relations(tags, ({ many }) => ({
  transactionTags: many(transactionTags),
}));

export const transactionTagRelations = relations(
  transactionTags,
  ({ one }) => ({
    tag: one(tags, {
      fields: [transactionTags.tagId],
      references: [tags.id],
    }),
    transaction: one(transactions, {
      fields: [transactionTags.transactionId],
      references: [transactions.id],
    }),
  }),
);
