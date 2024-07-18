import { contactsQueryKey } from "@/common/query-keys";
import { createContact } from "@/modules/contacts/contacts-actions";
import { ContactCreateForm } from "@/modules/contacts/schemas/contact-create-form-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateContactMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: contactsQueryKey(),
    mutationFn: (contact: ContactCreateForm) => createContact(contact),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: contactsQueryKey() }),
  });
}
