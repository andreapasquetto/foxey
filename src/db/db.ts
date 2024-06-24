import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

if (!process.env.POSTGRES_CONNECTION_STRING) {
  throw new Error("POSTGRES_CONNECTION_STRING is not defined");
}

const connection = postgres(process.env.POSTGRES_CONNECTION_STRING);

export const db = drizzle(connection, { schema });
