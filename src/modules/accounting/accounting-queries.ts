import { usePaginatedQuery } from "@/common/hooks/use-paginated-query";
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
    queryKey: ["wallets"],
    queryFn: () => walletsGetAll(),
  });
}

export function useWalletGetByIdQuery(id: string) {
  return useQuery({
    queryKey: ["wallets", id],
    queryFn: () => walletGetById(id),
    enabled: true,
  });
}

export function useTransactionCategoriesGetAllQuery() {
  return useQuery({
    queryKey: ["transaction-categories"],
    queryFn: () => transactionCategoriesGetAll(),
  });
}

export function useTransactionsGetPaginatedQuery(
  params: {
    searchFilter?: string;
    dateRange?: DateRange;
    walletId?: string;
    placeId?: string;
    categoryId?: string;
  } = {},
) {
  return usePaginatedQuery({
    queryKey: ["transactions", { ...params }],
    queryFn: (paginate) =>
      transactionsGetPaginated({
        paginate,
        searchFilter: params.searchFilter,
        dateRange: params.dateRange,
        walletId: params.walletId,
        placeId: params.placeId,
        categoryId: params.categoryId,
      }),
    placeholderData: keepPreviousData,
  });
}

export function useTransactionsGetAllQuery(
  params: { enabled?: boolean; walletId?: string; dateRange?: DateRange } = {},
) {
  return useQuery({
    queryKey: ["transactions", { walletId: params.walletId, dateRange: params.dateRange }],
    queryFn: () => transactionsGetAll(params),
    enabled: params.enabled ?? true,
  });
}

export function useTransactionGetByIdQuery(id: string) {
  return useQuery({
    queryKey: ["transactions", id],
    queryFn: () => transactionGetById(id),
    enabled: true,
  });
}
