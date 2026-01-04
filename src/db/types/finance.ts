import type {
  getAllTags,
  getAllTransactionCategories,
  getAllTransactionTemplates,
  getTransactionById,
  getWalletById,
} from "@/modules/finance/server-actions";

export type Wallet = Awaited<ReturnType<typeof getWalletById>>;

export type TransactionCategory = Awaited<
  ReturnType<typeof getAllTransactionCategories>
>[number];

export type TransactionTemplate = Awaited<
  ReturnType<typeof getAllTransactionTemplates>
>[number];

export type Transaction = Awaited<ReturnType<typeof getTransactionById>>;

export type Tag = Awaited<ReturnType<typeof getAllTags>>[number];
