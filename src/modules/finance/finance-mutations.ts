import {
  transactionCategoriesCreate,
  transactionsCreate,
  transactionsDelete,
  transactionsUpdate,
  walletsCreate,
  walletsUpdate,
} from "@/modules/finance/finance-actions";
import { TransactionCategoryCreateForm } from "@/modules/finance/schemas/transaction-category-create-form-schema";
import { TransactionCreateForm } from "@/modules/finance/schemas/transaction-create-form-schema";
import { TransactionUpdateForm } from "@/modules/finance/schemas/transaction-update-form-schema";
import { WalletCreateForm } from "@/modules/finance/schemas/wallet-create-form-schema";
import { WalletUpdateForm } from "@/modules/finance/schemas/wallet-update-form-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useWalletsCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["wallets", "create"],
    mutationFn: (wallet: WalletCreateForm) => walletsCreate(wallet),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
  });
}

export function useWalletsUpdateMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["wallets", id, "update"],
    mutationFn: (wallet: WalletUpdateForm) => walletsUpdate(wallet),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
  });
}

export function useTransactionCategoriesCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["transaction-categories", "create"],
    mutationFn: (category: TransactionCategoryCreateForm) => transactionCategoriesCreate(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction-categories"] });
    },
  });
}

export function useTransactionsCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["transactions", "create"],
    mutationFn: (transaction: TransactionCreateForm) => transactionsCreate(transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
  });
}

export function useTransactionsUpdateMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["transactions", id, "update"],
    mutationFn: (transaction: TransactionUpdateForm) => transactionsUpdate(transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
  });
}

export function useTransactionsDeleteMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["transactions", id, "delete"],
    mutationFn: (id: string) => transactionsDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
  });
}
