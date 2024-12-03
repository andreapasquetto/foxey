import {
  transactionDeleteQueryKey,
  transactionQueryKey,
  transactionsQueryKey,
  walletsQueryKey,
} from "@/common/query-keys";
import {
  transactionCreate,
  transactionDelete,
  transactionUpdate,
  walletCreate,
  walletUpdate,
} from "@/modules/accounting/accounting-actions";
import { TransactionCreateForm } from "@/modules/accounting/schemas/transaction-create-form-schema";
import { TransactionUpdateForm } from "@/modules/accounting/schemas/transaction-update-form-schema";
import { WalletCreateForm } from "@/modules/accounting/schemas/wallet-create-form-schema";
import { WalletUpdateForm } from "@/modules/accounting/schemas/wallet-update-form-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useWalletCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: walletsQueryKey(),
    mutationFn: (wallet: WalletCreateForm) => walletCreate(wallet),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: walletsQueryKey() }),
  });
}

export function useWalletUpdateMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: walletsQueryKey(id),
    mutationFn: (wallet: WalletUpdateForm) => walletUpdate(wallet),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: walletsQueryKey() }),
  });
}

export function useTransactionCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: transactionsQueryKey(),
    mutationFn: (transaction: TransactionCreateForm) => transactionCreate(transaction),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: transactionsQueryKey() }),
        queryClient.invalidateQueries({ queryKey: walletsQueryKey() }),
      ]),
  });
}

export function useTransactionUpdateMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: transactionQueryKey(id),
    mutationFn: (transaction: TransactionUpdateForm) => transactionUpdate(transaction),
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
    mutationFn: (id: string) => transactionDelete(id),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: transactionsQueryKey() }),
        queryClient.invalidateQueries({ queryKey: walletsQueryKey() }),
      ]),
  });
}
