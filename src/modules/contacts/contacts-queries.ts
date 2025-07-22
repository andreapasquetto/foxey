import { usePaginatedQuery } from "@/common/hooks/use-paginated-query";
import { contactsGetAllQuery, contactsGetPaginated } from "@/modules/contacts/contacts-actions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useContactsGetAllQuery(params: { discardArchived?: boolean } = {}) {
  return useQuery({
    queryKey: ["contacts", { ...params }],
    queryFn: () => contactsGetAllQuery(params),
    placeholderData: keepPreviousData,
  });
}

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
