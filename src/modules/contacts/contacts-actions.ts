"use server";

import { db } from "@/db/db";
import { contacts } from "@/db/schema/contacts";
import { ContactCreateForm } from "@/modules/contacts/schemas/contact-create-form-schema";
import { formatISO } from "date-fns";

export async function getContacts() {
  return await db
    .select()
    .from(contacts)
    .orderBy(contacts.isArchived, contacts.isBusiness, contacts.fullName);
}

export async function createContact(contact: ContactCreateForm) {
  // TODO: add addresses, emails and phoneNumbers
  await db.insert(contacts).values({
    fullName: contact.fullName,
    dob: formatISO(contact.dob),
    isArchived: contact.isArchived,
    isBusiness: contact.isBusiness,
    subtitle: contact.subtitle,
  });
}
