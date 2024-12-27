"use server";

import { Paginate, paginateToLimitAndOffset, toPaginated } from "@/common/pagination";
import { db } from "@/db/db";
import { contacts } from "@/db/schema/contacts";
import { ContactCreateForm } from "@/modules/contacts/schemas/contact-create-form-schema";
import { formatISO } from "date-fns";
import { and, eq, ilike } from "drizzle-orm";

export async function contactsGetPaginated(params: {
  paginate: Paginate;
  searchFilter?: string;
  onlyArchived?: boolean;
}) {
  const total = await contactsCountTotal(params);
  const { limit, offset } = paginateToLimitAndOffset(params.paginate);
  const records = await db
    .select()
    .from(contacts)
    .where(
      and(
        params.searchFilter ? ilike(contacts.fullName, `%${params.searchFilter}%`) : undefined,
        params.onlyArchived ? eq(contacts.isArchived, true) : undefined,
      ),
    )
    .limit(limit)
    .offset(offset)
    .orderBy(contacts.isArchived, contacts.isBusiness, contacts.fullName);

  return toPaginated(records, total);
}

export async function contactCreate(contact: ContactCreateForm) {
  // TODO: add addresses, emails and phoneNumbers
  await db.insert(contacts).values({
    fullName: contact.fullName,
    dob: formatISO(contact.dob, { representation: "date" }),
    isArchived: contact.isArchived,
    isBusiness: contact.isBusiness,
    subtitle: contact.subtitle,
  });
}

export async function contactDelete(id: string) {
  // TODO: delete addresses, emails and phoneNumbers
  await db.delete(contacts).where(eq(contacts.id, id));
}

export async function contactArchive(id: string) {
  await db.update(contacts).set({ isArchived: true }).where(eq(contacts.id, id));
}

export async function contactUnarchive(id: string) {
  await db.update(contacts).set({ isArchived: false }).where(eq(contacts.id, id));
}

async function contactsCountTotal(params: { searchFilter?: string; onlyArchived?: boolean }) {
  return (
    await db
      .select({ id: contacts.id })
      .from(contacts)
      .where(
        and(
          params.searchFilter ? ilike(contacts.fullName, `%${params.searchFilter}%`) : undefined,
          params.onlyArchived ? eq(contacts.isArchived, true) : undefined,
        ),
      )
  ).length;
}
