import { useMutation } from "@tanstack/react-query";
import {
  createTransaction,
  createTransactionCategory,
  createTransactionTemplate,
  createWallet,
  updateTransaction,
  updateWallet,
} from "@/modules/finance/server-actions";

export function useCreateWalletMutation() {
  return useMutation({
    mutationKey: ["wallets", "create"],
    mutationFn: createWallet,
  });
}

export function useUpdateWalletMutation() {
  return useMutation({
    mutationKey: ["wallets", "update"],
    mutationFn: updateWallet,
  });
}

export function useCreateTransactionCategoryMutation() {
  return useMutation({
    mutationKey: ["transaction-categories", "create"],
    mutationFn: createTransactionCategory,
  });
}

export function useCreateTransactionTemplateMutation() {
  return useMutation({
    mutationKey: ["transaction-templates", "create"],
    mutationFn: createTransactionTemplate,
  });
}

export function useCreateTransactionMutation() {
  return useMutation({
    mutationKey: ["transactions", "create"],
    mutationFn: createTransaction,
  });
}

export function useUpdateTransactionMutation() {
  return useMutation({
    mutationKey: ["transactions", "update"],
    mutationFn: updateTransaction,
  });
}
