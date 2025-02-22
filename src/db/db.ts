import { env } from "@/common/env";
import * as accountingSchema from "@/db/schema/accounting";
import * as contactsSchema from "@/db/schema/contacts";
import * as eventsSchema from "@/db/schema/events";
import * as mobilitySchema from "@/db/schema/mobility";
import * as placesSchema from "@/db/schema/places";
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
