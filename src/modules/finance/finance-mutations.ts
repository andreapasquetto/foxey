import { useMutation } from "@tanstack/react-query";
import {
  transactionCategoriesCreate,
  transactionsCreate,
  transactionsUpdate,
  transactionTemplatesCreate,
  walletsCreate,
  walletsUpdate,
} from "@/modules/finance/finance-actions";

export function useWalletsCreateMutation() {
  return useMutation({
    mutationKey: ["wallets", "create"],
    mutationFn: walletsCreate,
  });
}

export function useWalletsUpdateMutation() {
  return useMutation({
    mutationKey: ["wallets", "update"],
    mutationFn: walletsUpdate,
  });
}

export function useTransactionCategoriesCreateMutation() {
  return useMutation({
    mutationKey: ["transaction-categories", "create"],
    mutationFn: transactionCategoriesCreate,
  });
}

export function useTransactionTemplatesCreateMutation() {
  return useMutation({
    mutationKey: ["transaction-templates", "create"],
    mutationFn: transactionTemplatesCreate,
  });
}

export function useTransactionsCreateMutation() {
  return useMutation({
    mutationKey: ["transactions", "create"],
    mutationFn: transactionsCreate,
  });
}

export function useTransactionsUpdateMutation() {
  return useMutation({
    mutationKey: ["transactions", "update"],
    mutationFn: transactionsUpdate,
  });
}
