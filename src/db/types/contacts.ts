import type { getAllContacts } from "@/modules/contacts/server-actions";

export type Contact = Awaited<ReturnType<typeof getAllContacts>>[number];

export type ContactPhoneNumber = Awaited<
  ReturnType<typeof getAllContacts>
>[number]["phoneNumbers"][number];

export type ContactEmail = Awaited<
  ReturnType<typeof getAllContacts>
>[number]["emails"][number];

export type ContactAddress = Awaited<
  ReturnType<typeof getAllContacts>
>[number]["addresses"][number];
