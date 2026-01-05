import { useMutation } from "@tanstack/react-query";
import {
  createTag,
  createTransaction,
  createTransactionCategory,
  createTransactionTemplate,
  createWallet,
  updateTransaction,
  updateWallet,
} from "@/modules/finance/server-actions";

export function useCreateWalletMutation() {
  return useMutation({
    mutationKey: ["finance", "wallets", "create"],
    mutationFn: createWallet,
  });
}

export function useUpdateWalletMutation() {
  return useMutation({
    mutationKey: ["finance", "wallets", "update"],
    mutationFn: updateWallet,
  });
}

export function useCreateTransactionCategoryMutation() {
  return useMutation({
    mutationKey: ["finance", "categories", "create"],
    mutationFn: createTransactionCategory,
  });
}

export function useCreateTransactionTemplateMutation() {
  return useMutation({
    mutationKey: ["finance", "templates", "create"],
    mutationFn: createTransactionTemplate,
  });
}

export function useCreateTagMutation() {
  return useMutation({
    mutationKey: ["finance", "tags", "create"],
    mutationFn: createTag,
  });
}

export function useCreateTransactionMutation() {
  return useMutation({
    mutationKey: ["finance", "transactions", "create"],
    mutationFn: createTransaction,
  });
}

export function useUpdateTransactionMutation() {
  return useMutation({
    mutationKey: ["finance", "transactions", "update"],
    mutationFn: updateTransaction,
  });
}
