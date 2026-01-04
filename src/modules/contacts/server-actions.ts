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
import {
  contactAddresses,
  contactEmails,
  contactPhoneNumbers,
  contacts,
} from "@/db/schemas/contacts";
import type { CreateContactFormType } from "@/modules/contacts/schemas/create-contact-form-schema";

export async function createContact(contact: CreateContactFormType) {
  const userId = await getCurrentUserId();
  await db.transaction(async (tx) => {
    const newId = (
      await tx
        .insert(contacts)
        .values({
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
        })
        .returning({ id: contacts.id })
    )[0].id;
    for (const phoneNumber of contact.phoneNumbers) {
      await tx.insert(contactPhoneNumbers).values({
        contactId: newId,
        value: phoneNumber.value,
      });
    }
    for (const email of contact.emails) {
      await tx.insert(contactEmails).values({
        contactId: newId,
        value: email.value,
      });
    }
    for (const address of contact.addresses) {
      await tx.insert(contactAddresses).values({
        contactId: newId,
        value: address.value,
      });
    }
  });
  revalidatePath(contactsRoute);
  redirect(contactsRoute);
}

export async function getPaginatedContacts(params: {
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
export async function getAllContactsBirthdays() {
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

export async function getAllContacts(
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

export async function deleteContact(formData: FormData) {
  const id = z.uuid().parse(formData.get("id"));
  const userId = await getCurrentUserId();
  await db.transaction(async (tx) => {
    await tx.delete(contactAddresses).where(eq(contactAddresses.contactId, id));
    await tx.delete(contactEmails).where(eq(contactEmails.contactId, id));
    await tx
      .delete(contactPhoneNumbers)
      .where(eq(contactPhoneNumbers.contactId, id));
    await tx
      .delete(contacts)
      .where(and(eq(contacts.userId, userId), eq(contacts.id, id)));
  });
  revalidatePath(contactsRoute);
}

export async function archiveContact(formData: FormData) {
  const id = z.uuid().parse(formData.get("id"));
  const userId = await getCurrentUserId();
  await db
    .update(contacts)
    .set({ isArchived: true })
    .where(and(eq(contacts.userId, userId), eq(contacts.id, id)));
  revalidatePath(contactsRoute);
}

export async function unarchiveContact(formData: FormData) {
  const id = z.uuid().parse(formData.get("id"));
  const userId = await getCurrentUserId();
  await db
    .update(contacts)
    .set({ isArchived: false })
    .where(and(eq(contacts.userId, userId), eq(contacts.id, id)));
  revalidatePath(contactsRoute);
}
