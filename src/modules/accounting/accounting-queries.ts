import { usePaginatedQuery } from "@/common/hooks/use-paginated-query";
import {
  transactionCategoriesQueryKey,
  transactionsQueryKey,
  walletsQueryKey,
} from "@/common/query-keys";
import {
  getWallets,
  transactionCategoriesGetAll,
  transactionsGetAll,
  transactionsGetPaginated,
} from "@/modules/accounting/accounting-actions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";

export function useWalletsQuery() {
  return useQuery({
    queryKey: walletsQueryKey(),
    queryFn: () => getWallets(),
  });
}

export function useTransactionCategoriesQuery() {
  return useQuery({
    queryKey: transactionCategoriesQueryKey(),
    queryFn: () => transactionCategoriesGetAll(),
  });
}

export function useTransactionsPaginatedQuery(
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
  params: { walletId?: string; dateRange?: DateRange } = {},
) {
  return useQuery({
    queryKey: transactionsQueryKey(params),
    queryFn: () => transactionsGetAll(params),
  });
}
