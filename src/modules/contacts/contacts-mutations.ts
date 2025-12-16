import { useMutation } from "@tanstack/react-query";
import { contactsCreate } from "@/modules/contacts/contacts-actions";

export function useContactsCreateMutation() {
  return useMutation({
    mutationKey: ["contacts", "create"],
    mutationFn: contactsCreate,
  });
}
