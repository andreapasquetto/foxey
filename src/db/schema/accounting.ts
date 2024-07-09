import { timestamp, numeric, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const wallets = pgTable("wallets", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name").notNull(),
  initialBalance: numeric("initial_balance").default("0"),
});

export const transactions = pgTable("transactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  datetime: timestamp("datetime").notNull(),
  from: uuid("from").references(() => wallets.id),
  to: uuid("to").references(() => wallets.id),
  category: varchar("category"),
  amount: numeric("amount").notNull(),
  description: varchar("description"),
});
