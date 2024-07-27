import { db } from "@/db/db";
import { sql } from "drizzle-orm";
import { PgTableWithColumns, TableConfig } from "drizzle-orm/pg-core";

export async function countTotalRecords<T extends TableConfig>(table: PgTableWithColumns<T>) {
  const total = await db.select({ value: sql`count(*)`.mapWith(Number) }).from(table);
  return total[0].value;
}
