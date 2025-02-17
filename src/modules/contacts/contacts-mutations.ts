import {
  contactsArchive,
  contactsCreate,
  contactsDelete,
  contactsUnarchive,
} from "@/modules/contacts/contacts-actions";
import { ContactCreateForm } from "@/modules/contacts/schemas/contact-create-form-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useContactsCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["contacts", "create"],
    mutationFn: (contact: ContactCreateForm) => contactsCreate(contact),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}

export function useContactsDeleteMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["contacts", id, "delete"],
    mutationFn: (id: string) => contactsDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}

export function useContactsArchiveMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["contacts", id, "archive"],
    mutationFn: (id: string) => contactsArchive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}

export function useContactsUnarchiveMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["contacts", id, "unarchive"],
    mutationFn: (id: string) => contactsUnarchive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}
