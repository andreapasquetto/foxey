import { contactsCreate } from "@/modules/contacts/contacts-actions";
import { ContactCreateForm } from "@/modules/contacts/schemas/contact-create-form-schema";
import { useMutation } from "@tanstack/react-query";

export function useContactsCreateMutation() {
  return useMutation({
    mutationKey: ["contacts", "create"],
    mutationFn: (contact: ContactCreateForm) => contactsCreate(contact),
  });
}
