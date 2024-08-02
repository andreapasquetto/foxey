import { usePaginatedQuery } from "@/common/hooks/use-paginated-query";
import {
  transactionCategoriesQueryKey,
  transactionsLastMonthQueryKey,
  transactionsMonthToDateQueryKey,
  transactionsQueryKey,
  walletsQueryKey,
} from "@/common/query-keys";
import {
  getWallets,
  transactionCategoriesGetAll,
  transactionsGetLastMonth,
  transactionsGetMonthToDate,
  transactionsGetPaginated,
} from "@/modules/accounting/accounting-actions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

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

export function useTransactionsGetMonthToDateQuery() {
  return useQuery({
    queryKey: transactionsMonthToDateQueryKey(),
    queryFn: () => transactionsGetMonthToDate(),
  });
}

export function useTransactionsGetLastMonthQuery() {
  return useQuery({
    queryKey: transactionsLastMonthQueryKey(),
    queryFn: () => transactionsGetLastMonth(),
  });
}

export function useTransactionsPaginatedQuery(walletId: string | undefined) {
  return usePaginatedQuery({
    queryKey: transactionsQueryKey(walletId),
    queryFn: (paginate) => transactionsGetPaginated({ paginate, walletId }),
    placeholderData: keepPreviousData,
  });
}
