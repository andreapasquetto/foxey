import {
  transactionCategoriesCreate,
  transactionsCreate,
  transactionsUpdate,
  transactionTemplatesCreate,
  walletsCreate,
  walletsUpdate,
} from "@/modules/finance/finance-actions";
import { CreateTransactionCategoryFormType } from "@/modules/finance/schemas/create-transaction-category-form-schema";
import { CreateTransactionFormType } from "@/modules/finance/schemas/create-transaction-form-schema";
import { CreateTransactionTemplateFormType } from "@/modules/finance/schemas/create-transaction-template-form-schema";
import { CreateWalletFormType } from "@/modules/finance/schemas/create-wallet-form-schema";
import { UpdateTransactionFormType } from "@/modules/finance/schemas/update-transaction-form-schema";
import { UpdateWalletFormType } from "@/modules/finance/schemas/update-wallet-form-schema";
import { useMutation } from "@tanstack/react-query";

export function useWalletsCreateMutation() {
  return useMutation({
    mutationKey: ["wallets", "create"],
    mutationFn: (wallet: CreateWalletFormType) => walletsCreate(wallet),
  });
}

export function useWalletsUpdateMutation() {
  return useMutation({
    mutationKey: ["wallets", "update"],
    mutationFn: (wallet: UpdateWalletFormType) => walletsUpdate(wallet),
  });
}

export function useTransactionCategoriesCreateMutation() {
  return useMutation({
    mutationKey: ["transaction-categories", "create"],
    mutationFn: (category: CreateTransactionCategoryFormType) =>
      transactionCategoriesCreate(category),
  });
}

export function useTransactionTemplatesCreateMutation() {
  return useMutation({
    mutationKey: ["transaction-templates", "create"],
    mutationFn: (template: CreateTransactionTemplateFormType) =>
      transactionTemplatesCreate(template),
  });
}

export function useTransactionsCreateMutation() {
  return useMutation({
    mutationKey: ["transactions", "create"],
    mutationFn: (transaction: CreateTransactionFormType) => transactionsCreate(transaction),
  });
}

export function useTransactionsUpdateMutation() {
  return useMutation({
    mutationKey: ["transactions", "update"],
    mutationFn: (transaction: UpdateTransactionFormType) => transactionsUpdate(transaction),
  });
}
