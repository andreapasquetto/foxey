import { contactsCreate } from "@/modules/contacts/contacts-actions";
import { CreateContactFormType } from "@/modules/contacts/schemas/create-contact-form-schema";
import { useMutation } from "@tanstack/react-query";

export function useContactsCreateMutation() {
  return useMutation({
    mutationKey: ["contacts", "create"],
    mutationFn: (contact: CreateContactFormType) => contactsCreate(contact),
  });
}
