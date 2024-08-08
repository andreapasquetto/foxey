import { TransactionRead } from "@/modules/accounting/schemas/transaction-read-schema";
import { WalletRead } from "@/modules/accounting/schemas/wallet-read-schema";
import { Decimal } from "decimal.js";

export function calculateTotalBalance(wallets: WalletRead[]) {
  return wallets.reduce((acc, curr) => acc.add(curr.amount), new Decimal(0));
}

export function getTransactionsWithoutTransfers(transactions: TransactionRead[]) {
  return transactions.filter((tx) => !(tx.fromWalletId && tx.toWalletId));
}

export function getIncomingTransactions(transactions: TransactionRead[]) {
  return transactions.filter((tx) => tx.toWalletId);
}

export function getOutgoingTransactions(transactions: TransactionRead[]) {
  return transactions.filter((tx) => tx.fromWalletId);
}

export function calculateTransactionsAmount(transactions: TransactionRead[]) {
  return transactions.reduce((acc, curr) => acc.add(new Decimal(curr.amount)), new Decimal(0));
}
