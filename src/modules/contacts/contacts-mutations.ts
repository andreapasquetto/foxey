import {
  contactArchive,
  contactCreate,
  contactDelete,
  contactUnarchive,
} from "@/modules/contacts/contacts-actions";
import { ContactCreateForm } from "@/modules/contacts/schemas/contact-create-form-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useContactCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["contacts", "create"],
    mutationFn: (contact: ContactCreateForm) => contactCreate(contact),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}

export function useContactDeleteMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["contacts", id, "delete"],
    mutationFn: (id: string) => contactDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}

export function useContactArchiveMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["contacts", id, "archive"],
    mutationFn: (id: string) => contactArchive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}

export function useContactUnarchiveMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["contacts", id, "unarchive"],
    mutationFn: (id: string) => contactUnarchive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}
