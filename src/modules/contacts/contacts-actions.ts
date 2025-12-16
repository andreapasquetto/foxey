"use server";

import { formatISO, setYear } from "date-fns";
import { and, eq, ilike, isNotNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  type Paginate,
  paginateToLimitAndOffset,
  toPaginated,
} from "@/common/pagination";
import { contactsRoute } from "@/common/routes";
import { getCurrentUserId } from "@/common/utils/auth";
import { IGNORE_DOB_YEAR } from "@/common/utils/dates";
import { db } from "@/db/db";
import { contacts } from "@/db/schemas/contacts";
import type { CreateContactFormType } from "@/modules/contacts/schemas/create-contact-form-schema";

export async function contactsCreate(contact: CreateContactFormType) {
  const userId = await getCurrentUserId();
  // TODO: add addresses, emails and phoneNumbers
  await db.insert(contacts).values({
    userId,
    fullName: contact.fullName,
    subtitle: contact.subtitle,
    isBusiness: contact.isBusiness,
    dob: contact.dob
      ? formatISO(
          contact.ignoreDobYear
            ? setYear(contact.dob, IGNORE_DOB_YEAR)
            : contact.dob,
          {
            representation: "date",
          },
        )
      : null,
  });
  revalidatePath(contactsRoute);
  redirect(contactsRoute);
}

export async function contactsGetPaginated(params: {
  paginate: Paginate;
  query?: string;
}) {
  const userId = await getCurrentUserId();
  const { limit, offset } = paginateToLimitAndOffset(params.paginate);
  const total = (
    await db
      .select({ id: contacts.id })
      .from(contacts)
      .where(
        and(
          eq(contacts.userId, userId),
          params.query
            ? ilike(contacts.fullName, `%${params.query}%`)
            : undefined,
        ),
      )
  ).length;
  const records = await db.query.contacts.findMany({
    with: {
      phoneNumbers: {
        columns: {
          contactId: false,
        },
      },
      emails: {
        columns: {
          contactId: false,
        },
      },
      addresses: {
        columns: {
          contactId: false,
        },
      },
    },
    limit,
    offset,
    where: and(
      eq(contacts.userId, userId),
      params.query ? ilike(contacts.fullName, `%${params.query}%`) : undefined,
    ),
    orderBy: [contacts.fullName],
  });
  return toPaginated(records, total);
}

// TODO: add dateRange filter
export async function contactsGetAllBirthdays() {
  const userId = await getCurrentUserId();
  return await db.query.contacts.findMany({
    columns: {
      id: true,
      fullName: true,
      dob: true,
    },
    where: and(
      eq(contacts.userId, userId),
      eq(contacts.isArchived, false),
      isNotNull(contacts.dob),
    ),
  });
}

export async function contactsGetAll(
  params: { query?: string; discardArchived?: boolean } = {},
) {
  const userId = await getCurrentUserId();
  return await db.query.contacts.findMany({
    with: {
      addresses: {
        columns: {
          contactId: false,
        },
      },
      emails: {
        columns: {
          contactId: false,
        },
      },
      phoneNumbers: {
        columns: {
          contactId: false,
        },
      },
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
  const id = z.uuid().parse(formData.get("id"));
  const userId = await getCurrentUserId();
  // TODO: delete addresses, emails and phoneNumbers
  await db
    .delete(contacts)
    .where(and(eq(contacts.userId, userId), eq(contacts.id, id)));
  revalidatePath(contactsRoute);
}

export async function contactsArchive(formData: FormData) {
  const id = z.uuid().parse(formData.get("id"));
  const userId = await getCurrentUserId();
  await db
    .update(contacts)
    .set({ isArchived: true })
    .where(and(eq(contacts.userId, userId), eq(contacts.id, id)));
  revalidatePath(contactsRoute);
}

export async function contactsUnarchive(formData: FormData) {
  const id = z.uuid().parse(formData.get("id"));
  const userId = await getCurrentUserId();
  await db
    .update(contacts)
    .set({ isArchived: false })
    .where(and(eq(contacts.userId, userId), eq(contacts.id, id)));
  revalidatePath(contactsRoute);
}
