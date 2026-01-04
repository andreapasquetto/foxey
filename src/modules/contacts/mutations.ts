import { useMutation } from "@tanstack/react-query";
import { createContact } from "@/modules/contacts/server-actions";

export function useCreateContactMutation() {
  return useMutation({
    mutationKey: ["contacts", "create"],
    mutationFn: createContact,
  });
}
