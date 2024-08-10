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
  transactionsGetAll,
  transactionsGetLastMonth,
  transactionsGetMonthToDate,
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

// TODO: remove in favour of useTransactionsGetAllQuery with dateRage param
export function useTransactionsGetMonthToDateQuery() {
  return useQuery({
    queryKey: transactionsMonthToDateQueryKey(),
    queryFn: () => transactionsGetMonthToDate(),
  });
}

// TODO: remove in favour of useTransactionsGetAllQuery with dateRage param
export function useTransactionsGetLastMonthQuery() {
  return useQuery({
    queryKey: transactionsLastMonthQueryKey(),
    queryFn: () => transactionsGetLastMonth(),
  });
}

export function useTransactionsPaginatedQuery(options: {
  walletId?: string;
  dateRange?: DateRange;
}) {
  return usePaginatedQuery({
    queryKey: transactionsQueryKey(options),
    queryFn: (paginate) =>
      transactionsGetPaginated({
        paginate,
        walletId: options.walletId,
        dateRange: options.dateRange,
      }),
    placeholderData: keepPreviousData,
  });
}

// TODO: add dateRange param
export function useTransactionsGetAllQuery(walletId?: string) {
  return useQuery({
    queryKey: transactionsQueryKey({
      walletId,
    }),
    queryFn: () => transactionsGetAll(walletId),
  });
}
