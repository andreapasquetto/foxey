import { relations } from "drizzle-orm";
import { AnyPgColumn, date, numeric, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const wallets = pgTable("wallets", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name").notNull(),
  initialAmount: numeric("initial_amount").default("0"),
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
  date: date("date", { mode: "date" }).notNull().defaultNow(),
  fromWalletId: uuid("from_wallet_id").references(() => wallets.id),
  toWalletId: uuid("to_wallet_id").references(() => wallets.id),
  categoryId: uuid("category_id").references(() => transactionCategories.id),
  amount: numeric("amount").notNull(),
  description: varchar("description"),
});

export const transactionCategoriesRelations = relations(transactionCategories, ({ many }) => ({
  transactions: many(transactions),
}));

export const transactionRelations = relations(transactions, ({ one }) => ({
  transactionCategories: one(transactionCategories, {
    fields: [transactions.categoryId],
    references: [transactionCategories.id],
  }),
}));
