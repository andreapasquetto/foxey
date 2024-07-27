import { usePaginatedQuery } from "@/common/hooks/use-paginated-query";
import {
  transactionCategoriesQueryKey,
  transactionsQueryKey,
  walletsQueryKey,
} from "@/common/query-keys";
import {
  getTransactionCategories,
  getWallets,
  transactionsGetPaginated,
} from "@/modules/accounting/accounting-actions";
import { useQuery } from "@tanstack/react-query";

export function useWalletsQuery() {
  return useQuery({
    queryKey: walletsQueryKey(),
    queryFn: () => getWallets(),
  });
}

export function useTransactionCategoriesQuery() {
  return useQuery({
    queryKey: transactionCategoriesQueryKey(),
    queryFn: () => getTransactionCategories(),
  });
}

export function useTransactionsPaginatedQuery(walletId: string | undefined) {
  return usePaginatedQuery({
    queryKey: transactionsQueryKey(walletId),
    queryFn: (paginate) => transactionsGetPaginated({ paginate, walletId }),
  });
}
