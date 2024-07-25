import {
  transactionCategoriesQueryKey,
  transactionsQueryKey,
  walletsQueryKey,
} from "@/common/query-keys";
import {
  getTransactionCategories,
  getTransactions,
  getWallets,
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

export function useTransactionsQuery() {
  return useQuery({
    queryKey: transactionsQueryKey(),
    queryFn: () => getTransactions(),
  });
}
