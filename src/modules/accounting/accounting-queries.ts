import { usePaginatedQuery } from "@/common/hooks/use-paginated-query";
import {
  transactionCategoriesQueryKey,
  transactionsQueryKey,
  walletsQueryKey,
} from "@/common/query-keys";
import {
  transactionCategoriesGetAll,
  transactionsGetAll,
  transactionsGetPaginated,
  walletsGetAll,
} from "@/modules/accounting/accounting-actions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";

export function useWalletsGetAllQuery() {
  return useQuery({
    queryKey: walletsQueryKey(),
    queryFn: () => walletsGetAll(),
  });
}

export function useTransactionCategoriesGetAllQuery() {
  return useQuery({
    queryKey: transactionCategoriesQueryKey(),
    queryFn: () => transactionCategoriesGetAll(),
  });
}

export function useTransactionsGetPaginatedQuery(
  params: {
    walletId?: string;
    dateRange?: DateRange;
  } = {},
) {
  return usePaginatedQuery({
    queryKey: transactionsQueryKey(params),
    queryFn: (paginate) =>
      transactionsGetPaginated({
        paginate,
        walletId: params.walletId,
        dateRange: params.dateRange,
      }),
    placeholderData: keepPreviousData,
  });
}

export function useTransactionsGetAllQuery(
  params: { enabled?: boolean; walletId?: string; dateRange?: DateRange } = {},
) {
  return useQuery({
    queryKey: transactionsQueryKey(params),
    queryFn: () => transactionsGetAll(params),
    enabled: params.enabled ?? true,
  });
}
