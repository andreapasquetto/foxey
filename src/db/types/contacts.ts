import { contactsGetAll } from "@/modules/contacts/contacts-actions";

export type Contact = Awaited<ReturnType<typeof contactsGetAll>>[number];
