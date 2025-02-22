import { contactsGetPaginated } from "@/modules/contacts/contacts-actions";

export type Contact = Awaited<ReturnType<typeof contactsGetPaginated>>["records"][number];
