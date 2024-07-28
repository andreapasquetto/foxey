import { usePaginatedQuery } from "@/common/hooks/use-paginated-query";
import { contactsQueryKey } from "@/common/query-keys";
import { contactsGetPaginated } from "@/modules/contacts/contacts-actions";

export function useContactsPaginatedQuery() {
  return usePaginatedQuery({
    queryKey: contactsQueryKey(),
    queryFn: (paginate) => contactsGetPaginated(paginate),
  });
}
