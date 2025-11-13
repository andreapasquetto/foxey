import { useMutation } from "@tanstack/react-query";
import { contactsCreate } from "@/modules/contacts/contacts-actions";
import type { CreateContactFormType } from "@/modules/contacts/schemas/create-contact-form-schema";

export function useContactsCreateMutation() {
  return useMutation({
    mutationKey: ["contacts", "create"],
    mutationFn: (contact: CreateContactFormType) => contactsCreate(contact),
  });
}
