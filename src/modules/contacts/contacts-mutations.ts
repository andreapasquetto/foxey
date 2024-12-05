import { createContact, deleteContact } from "@/modules/contacts/contacts-actions";
import { ContactCreateForm } from "@/modules/contacts/schemas/contact-create-form-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateContactMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["contacts", "create"],
    mutationFn: (contact: ContactCreateForm) => createContact(contact),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}

export function useDeleteContactMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["contacts", id, "delete"],
    mutationFn: (id: string) => deleteContact(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}
