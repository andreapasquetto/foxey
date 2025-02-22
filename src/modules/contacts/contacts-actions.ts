"use server";

import { Paginate, paginateToLimitAndOffset, toPaginated } from "@/common/pagination";
import { getCurrentUserId } from "@/common/utils/auth";
import { db } from "@/db/db";
import { contacts } from "@/db/schemas/contacts";
import { ContactCreateForm } from "@/modules/contacts/schemas/contact-create-form-schema";
import { formatISO } from "date-fns";
import { and, eq, ilike } from "drizzle-orm";

export async function contactsCreate(contact: ContactCreateForm) {
  const userId = await getCurrentUserId();
  // TODO: add addresses, emails and phoneNumbers
  await db.insert(contacts).values({
    userId,
    fullName: contact.fullName,
    dob: formatISO(contact.dob, { representation: "date" }),
    isArchived: contact.isArchived,
    isBusiness: contact.isBusiness,
    subtitle: contact.subtitle,
  });
}

export async function contactsGetPaginated(params: {
  paginate: Paginate;
  searchFilter?: string;
  onlyArchived?: boolean;
}) {
  const userId = await getCurrentUserId();
  const { limit, offset } = paginateToLimitAndOffset(params.paginate);
  const total = await countTotalContacts(params);
  const records = await db.query.contacts.findMany({
    with: {
      addresses: true,
      emails: true,
      phoneNumbers: true,
    },
    where: and(
      eq(contacts.userId, userId),
      params.searchFilter ? ilike(contacts.fullName, `%${params.searchFilter}%`) : undefined,
      params.onlyArchived ? eq(contacts.isArchived, true) : undefined,
    ),
    limit,
    offset,
    orderBy: [contacts.isArchived, contacts.isBusiness, contacts.fullName],
  });

  return toPaginated(records, total);
}

export async function contactsDelete(id: string) {
  const userId = await getCurrentUserId();
  // TODO: delete addresses, emails and phoneNumbers
  await db.delete(contacts).where(and(eq(contacts.userId, userId), eq(contacts.id, id)));
}

export async function contactsArchive(id: string) {
  const userId = await getCurrentUserId();
  await db
    .update(contacts)
    .set({ isArchived: true })
    .where(and(eq(contacts.userId, userId), eq(contacts.id, id)));
}

export async function contactsUnarchive(id: string) {
  const userId = await getCurrentUserId();
  await db
    .update(contacts)
    .set({ isArchived: false })
    .where(and(eq(contacts.userId, userId), eq(contacts.id, id)));
}

async function countTotalContacts(params: { searchFilter?: string; onlyArchived?: boolean }) {
  const userId = await getCurrentUserId();
  return (
    await db
      .select({ id: contacts.id })
      .from(contacts)
      .where(
        and(
          eq(contacts.userId, userId),
          params.searchFilter ? ilike(contacts.fullName, `%${params.searchFilter}%`) : undefined,
          params.onlyArchived ? eq(contacts.isArchived, true) : undefined,
        ),
      )
  ).length;
}
