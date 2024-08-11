import { TransactionRead } from "@/modules/accounting/schemas/transaction-read-schema";
import { WalletRead } from "@/modules/accounting/schemas/wallet-read-schema";
import { isWithinInterval } from "date-fns";
import { Decimal } from "decimal.js";
import { DateRange } from "react-day-picker";

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

export function generateTrendChartData(
  transactions: TransactionRead[],
  filters: {
    walletId?: string;
    dateRange?: DateRange;
  } = {},
) {
  return transactions
    .reduce<
      Array<{
        date: Date;
        amount: Decimal;
      }>
    >((acc, tx) => {
      let amountChange = new Decimal(0);

      const isTransfer = tx.fromWalletId && tx.toWalletId;
      if (isTransfer) {
        if (tx.fromWalletId === filters.walletId) amountChange = amountChange.sub(tx.amount);
        if (tx.toWalletId === filters.walletId) amountChange = amountChange.add(tx.amount);
      } else {
        if (tx.fromWalletId) amountChange = amountChange.sub(tx.amount);
        if (tx.toWalletId) amountChange = amountChange.add(tx.amount);
      }

      acc.push({
        date: tx.date,
        amount: acc.length ? acc[acc.length - 1].amount.add(amountChange) : amountChange,
      });

      return acc;
    }, [])
    .filter((tx) =>
      filters.dateRange
        ? isWithinInterval(tx.date, { start: filters.dateRange.from!, end: filters.dateRange.to! })
        : true,
    )
    .map((item) => ({ date: item.date, amount: item.amount.toNumber() }));
}
