"use server";

import { Paginate, paginateToLimitAndOffset, toPaginated } from "@/common/pagination";
import { countTotalRecords } from "@/common/server-actions";
import { db } from "@/db/db";
import { contacts } from "@/db/schema/contacts";
import { ContactCreateForm } from "@/modules/contacts/schemas/contact-create-form-schema";
import { formatISO } from "date-fns";
import { eq } from "drizzle-orm";

export async function contactsGetPaginated(paginate: Paginate) {
  const total = await countTotalRecords(contacts);
  const { limit, offset } = paginateToLimitAndOffset(paginate);
  const records = await db
    .select()
    .from(contacts)
    .limit(limit)
    .offset(offset)
    .orderBy(contacts.isArchived, contacts.isBusiness, contacts.fullName);

  return toPaginated(records, total);
}

export async function createContact(contact: ContactCreateForm) {
  // TODO: add addresses, emails and phoneNumbers
  await db.insert(contacts).values({
    fullName: contact.fullName,
    dob: formatISO(contact.dob, { representation: "date" }),
    isArchived: contact.isArchived,
    isBusiness: contact.isBusiness,
    subtitle: contact.subtitle,
  });
}

export async function deleteContact(id: string) {
  // TODO: delete addresses, emails and phoneNumbers
  await db.delete(contacts).where(eq(contacts.id, id));
}
