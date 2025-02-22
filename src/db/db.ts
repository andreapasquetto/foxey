import { env } from "@/common/env";
import * as accountingSchema from "@/db/schemas/accounting";
import * as contactsSchema from "@/db/schemas/contacts";
import * as eventsSchema from "@/db/schemas/events";
import * as mobilitySchema from "@/db/schemas/mobility";
import * as placesSchema from "@/db/schemas/places";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connection = postgres(env.database.connectionString);

export const db = drizzle(connection, {
  schema: {
    ...accountingSchema,
    ...contactsSchema,
    ...eventsSchema,
    ...mobilitySchema,
    ...placesSchema,
  },
});
