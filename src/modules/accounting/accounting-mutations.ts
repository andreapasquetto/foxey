import {
  transactionDeleteQueryKey,
  transactionsQueryKey,
  walletsQueryKey,
} from "@/common/query-keys";
import {
  createTransaction,
  createWallet,
  deleteTransaction,
} from "@/modules/accounting/accounting-actions";
import { TransactionCreateForm } from "@/modules/accounting/schemas/transaction-create-form-schema";
import { WalletCreateForm } from "@/modules/accounting/schemas/wallet-create-form-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useWalletCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: walletsQueryKey(),
    mutationFn: (wallet: WalletCreateForm) => createWallet(wallet),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: walletsQueryKey() }),
  });
}

export function useTransactionCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: transactionsQueryKey(),
    mutationFn: (transaction: TransactionCreateForm) => createTransaction(transaction),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: transactionsQueryKey() }),
        queryClient.invalidateQueries({ queryKey: walletsQueryKey() }),
      ]),
  });
}

export function useTransactionDeleteMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: transactionDeleteQueryKey(id),
    mutationFn: (id: string) => deleteTransaction(id),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: transactionsQueryKey() }),
        queryClient.invalidateQueries({ queryKey: walletsQueryKey() }),
      ]),
  });
}
