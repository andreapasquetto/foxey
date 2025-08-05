import {
  transactionCategoriesCreate,
  transactionsCreate,
  transactionsUpdate,
  walletsCreate,
  walletsUpdate,
} from "@/modules/finance/finance-actions";
import { TransactionCategoryCreateForm } from "@/modules/finance/schemas/transaction-category-create-form-schema";
import { TransactionCreateForm } from "@/modules/finance/schemas/transaction-create-form-schema";
import { TransactionUpdateForm } from "@/modules/finance/schemas/transaction-update-form-schema";
import { WalletCreateForm } from "@/modules/finance/schemas/wallet-create-form-schema";
import { WalletUpdateForm } from "@/modules/finance/schemas/wallet-update-form-schema";
import { useMutation } from "@tanstack/react-query";

export function useWalletsCreateMutation() {
  return useMutation({
    mutationKey: ["wallets", "create"],
    mutationFn: (wallet: WalletCreateForm) => walletsCreate(wallet),
  });
}

export function useWalletsUpdateMutation() {
  return useMutation({
    mutationKey: ["wallets", "update"],
    mutationFn: (wallet: WalletUpdateForm) => walletsUpdate(wallet),
  });
}

export function useTransactionCategoriesCreateMutation() {
  return useMutation({
    mutationKey: ["transaction-categories", "create"],
    mutationFn: (category: TransactionCategoryCreateForm) => transactionCategoriesCreate(category),
  });
}

export function useTransactionsCreateMutation() {
  return useMutation({
    mutationKey: ["transactions", "create"],
    mutationFn: (transaction: TransactionCreateForm) => transactionsCreate(transaction),
  });
}

export function useTransactionsUpdateMutation() {
  return useMutation({
    mutationKey: ["transactions", "update"],
    mutationFn: (transaction: TransactionUpdateForm) => transactionsUpdate(transaction),
  });
}
