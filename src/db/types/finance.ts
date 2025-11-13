import {
  transactionCategoriesGetAll,
  transactionsGetById,
  transactionTemplatesGetAll,
  walletsGetById,
} from "@/modules/finance/finance-actions";

export type Wallet = Awaited<ReturnType<typeof walletsGetById>>;

export type TransactionCategory = Awaited<ReturnType<typeof transactionCategoriesGetAll>>[number];

export type TransactionTemplate = Awaited<ReturnType<typeof transactionTemplatesGetAll>>[number];

export type Transaction = Awaited<ReturnType<typeof transactionsGetById>>;
