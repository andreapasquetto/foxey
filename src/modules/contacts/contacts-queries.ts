import { getContacts } from "@/modules/contacts/contacts-actions";
import { useQuery } from "@tanstack/react-query";

export function useContactsQuery() {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: () => getContacts(),
  });
}
