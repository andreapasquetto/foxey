import * as accountingSchema from "@/db/schema/accounting";
import * as contactsSchema from "@/db/schema/contacts";
import * as eventsSchema from "@/db/schema/events";
import * as mobilitySchema from "@/db/schema/mobility";
import * as placesSchema from "@/db/schema/places";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

if (!process.env.POSTGRES_CONNECTION_STRING) {
  throw new Error("POSTGRES_CONNECTION_STRING is not defined");
}

const connection = postgres(process.env.POSTGRES_CONNECTION_STRING);

export const db = drizzle(connection, {
  schema: {
    ...accountingSchema,
    ...contactsSchema,
    ...eventsSchema,
    ...mobilitySchema,
    ...placesSchema,
  },
});
