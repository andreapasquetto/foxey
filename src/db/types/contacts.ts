import type { contactsGetAll } from "@/modules/contacts/contacts-actions";

export type Contact = Awaited<ReturnType<typeof contactsGetAll>>[number];

export type ContactPhoneNumber = Awaited<
  ReturnType<typeof contactsGetAll>
>[number]["phoneNumbers"][number];

export type ContactEmail = Awaited<
  ReturnType<typeof contactsGetAll>
>[number]["emails"][number];

export type ContactAddress = Awaited<
  ReturnType<typeof contactsGetAll>
>[number]["addresses"][number];
