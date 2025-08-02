"use server";

import { contactsRoute } from "@/common/routes";
import { getCurrentUserId } from "@/common/utils/auth";
import { db } from "@/db/db";
import { contacts } from "@/db/schemas/contacts";
import { ContactCreateForm } from "@/modules/contacts/schemas/contact-create-form-schema";
import { formatISO } from "date-fns";
import { and, eq, ilike } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function contactsCreate(contact: ContactCreateForm) {
  const userId = await getCurrentUserId();
  // TODO: add addresses, emails and phoneNumbers
  await db.insert(contacts).values({
    userId,
    fullName: contact.fullName,
    dob: contact.dob && formatISO(contact.dob, { representation: "date" }),
    isArchived: contact.isArchived,
    isBusiness: contact.isBusiness,
    subtitle: contact.subtitle,
  });
  revalidatePath(contactsRoute);
  redirect(contactsRoute);
}

export async function contactsGetAll(
  params: {
    query?: string;
    discardArchived?: boolean;
  } = {},
) {
  const userId = await getCurrentUserId();
  return await db.query.contacts.findMany({
    with: {
      addresses: true,
      emails: true,
      phoneNumbers: true,
    },
    where: and(
      eq(contacts.userId, userId),
      params.query ? ilike(contacts.fullName, `%${params.query}%`) : undefined,
      params.discardArchived ? eq(contacts.isArchived, false) : undefined,
    ),
    orderBy: [contacts.isArchived, contacts.isBusiness, contacts.fullName],
  });
}

export async function contactsDelete(formData: FormData) {
  const id = z.string().parse(formData.get("id"));
  const userId = await getCurrentUserId();
  // TODO: delete addresses, emails and phoneNumbers
  await db.delete(contacts).where(and(eq(contacts.userId, userId), eq(contacts.id, id)));
  revalidatePath(contactsRoute);
}

export async function contactsArchive(formData: FormData) {
  const id = z.string().parse(formData.get("id"));
  const userId = await getCurrentUserId();
  await db
    .update(contacts)
    .set({ isArchived: true })
    .where(and(eq(contacts.userId, userId), eq(contacts.id, id)));
  revalidatePath(contactsRoute);
}

export async function contactsUnarchive(formData: FormData) {
  const id = z.string().parse(formData.get("id"));
  const userId = await getCurrentUserId();
  await db
    .update(contacts)
    .set({ isArchived: false })
    .where(and(eq(contacts.userId, userId), eq(contacts.id, id)));
  revalidatePath(contactsRoute);
}
