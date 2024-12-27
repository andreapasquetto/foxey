import {
  transactionCategoryCreate,
  transactionCreate,
  transactionDelete,
  transactionUpdate,
  walletCreate,
  walletUpdate,
} from "@/modules/accounting/accounting-actions";
import { TransactionCategoryCreateForm } from "@/modules/accounting/schemas/transaction-category-create-form-schema";
import { TransactionCreateForm } from "@/modules/accounting/schemas/transaction-create-form-schema";
import { TransactionUpdateForm } from "@/modules/accounting/schemas/transaction-update-form-schema";
import { WalletCreateForm } from "@/modules/accounting/schemas/wallet-create-form-schema";
import { WalletUpdateForm } from "@/modules/accounting/schemas/wallet-update-form-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useWalletCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["wallets", "create"],
    mutationFn: (wallet: WalletCreateForm) => walletCreate(wallet),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
  });
}

export function useWalletUpdateMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["wallets", id, "update"],
    mutationFn: (wallet: WalletUpdateForm) => walletUpdate(wallet),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
  });
}

export function useTransactionCategoryCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["transaction-categories", "create"],
    mutationFn: (category: TransactionCategoryCreateForm) => transactionCategoryCreate(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction-categories"] });
    },
  });
}

export function useTransactionCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["transactions", "create"],
    mutationFn: (transaction: TransactionCreateForm) => transactionCreate(transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
  });
}

export function useTransactionUpdateMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["transactions", id, "update"],
    mutationFn: (transaction: TransactionUpdateForm) => transactionUpdate(transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
  });
}

export function useTransactionDeleteMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["transactions", id, "delete"],
    mutationFn: (id: string) => transactionDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
  });
}
