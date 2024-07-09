"use server";

import { db } from "@/db/db";
import { contacts } from "@/db/schema/contacts";

export async function getContacts() {
  return await db.select().from(contacts);
}
