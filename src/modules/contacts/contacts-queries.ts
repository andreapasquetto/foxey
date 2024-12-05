import { usePaginatedQuery } from "@/common/hooks/use-paginated-query";
import { contactsGetPaginated } from "@/modules/contacts/contacts-actions";
import { keepPreviousData } from "@tanstack/react-query";

export function useContactsPaginatedQuery() {
  return usePaginatedQuery({
    queryKey: ["contacts"],
    queryFn: (paginate) => contactsGetPaginated(paginate),
    placeholderData: keepPreviousData,
  });
}
