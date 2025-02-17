import { usePaginatedQuery } from "@/common/hooks/use-paginated-query";
import { contactsGetPaginated } from "@/modules/contacts/contacts-actions";
import { keepPreviousData } from "@tanstack/react-query";

export function useContactsGetPaginatedQuery(
  params: { searchFilter?: string; onlyArchived?: boolean } = {},
) {
  return usePaginatedQuery({
    queryKey: ["contacts", { ...params }],
    queryFn: (paginate) =>
      contactsGetPaginated({
        paginate,
        searchFilter: params.searchFilter,
        onlyArchived: params.onlyArchived,
      }),
    placeholderData: keepPreviousData,
  });
}
