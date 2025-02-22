import {
  transactionCategoriesGetAll,
  transactionsGetById,
  walletsGetById,
} from "@/modules/accounting/accounting-actions";

export type Wallet = Awaited<ReturnType<typeof walletsGetById>>;

export type TransactionCategory = Awaited<ReturnType<typeof transactionCategoriesGetAll>>[number];

export type Transaction = Awaited<ReturnType<typeof transactionsGetById>>;
