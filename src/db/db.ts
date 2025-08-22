import { env } from "@/common/env";
import * as contactsSchema from "@/db/schemas/contacts";
import * as eventsSchema from "@/db/schemas/events";
import * as financeSchema from "@/db/schemas/finance";
import * as mobilitySchema from "@/db/schemas/mobility";
import * as placesSchema from "@/db/schemas/places";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connection = postgres(env.database.connectionString);

export const db = drizzle(connection, {
  schema: {
    ...contactsSchema,
    ...eventsSchema,
    ...financeSchema,
    ...mobilitySchema,
    ...placesSchema,
  },
});

export type DBTransaction = Parameters<Parameters<(typeof db)["transaction"]>[0]>[0];
