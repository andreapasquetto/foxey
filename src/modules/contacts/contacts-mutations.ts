import { contactDeleteQueryKey, contactsQueryKey } from "@/common/query-keys";
import { createContact, deleteContact } from "@/modules/contacts/contacts-actions";
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

export function useDeleteContactMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: contactDeleteQueryKey(id),
    mutationFn: (id: string) => deleteContact(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: contactsQueryKey() }),
  });
}
