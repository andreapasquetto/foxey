import { usePaginatedQuery } from "@/common/hooks/use-paginated-query";
import {
  transactionCategoriesQueryKey,
  transactionQueryKey,
  transactionsQueryKey,
  walletsQueryKey,
} from "@/common/query-keys";
import {
  transactionCategoriesGetAll,
  transactionGetById,
  transactionsGetAll,
  transactionsGetPaginated,
  walletGetById,
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

export function useWalletGetByIdQuery(id: string) {
  return useQuery({
    queryKey: walletsQueryKey(id),
    queryFn: () => walletGetById(id),
    enabled: true,
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
    searchFilter?: string;
  } = {},
) {
  return usePaginatedQuery({
    queryKey: transactionsQueryKey(params),
    queryFn: (paginate) =>
      transactionsGetPaginated({
        paginate,
        walletId: params.walletId,
        dateRange: params.dateRange,
        searchFilter: params.searchFilter,
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

export function useTransactionGetByIdQuery(id: string) {
  return useQuery({
    queryKey: transactionQueryKey(id),
    queryFn: () => transactionGetById(id),
    enabled: true,
  });
}
