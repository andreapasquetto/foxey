import { ChartConfig } from "@/components/ui/chart";
import { TransactionCategoryRead } from "@/modules/accounting/schemas/transaction-category-read-schema";
import { TransactionRead } from "@/modules/accounting/schemas/transaction-read-schema";
import { WalletRead } from "@/modules/accounting/schemas/wallet-read-schema";
import { isWithinInterval } from "date-fns";
import { Decimal } from "decimal.js";
import { DateRange } from "react-day-picker";

export function calculateTotalBalance(wallets: WalletRead[]) {
  return wallets.reduce((acc, curr) => acc.add(curr.amount), new Decimal(0));
}

export function getTransactionsWithoutTransfers(transactions: TransactionRead[]) {
  return transactions.filter((tx) => !(tx.fromWallet && tx.toWallet));
}

export function getIncomingTransactions(transactions: TransactionRead[]) {
  return transactions.filter((tx) => tx.toWallet);
}

export function getOutgoingTransactions(transactions: TransactionRead[]) {
  return transactions.filter((tx) => tx.fromWallet);
}

export function calculateTransactionsAmount(transactions: TransactionRead[]) {
  return transactions.reduce((acc, curr) => acc.add(new Decimal(curr.amount)), new Decimal(0));
}

export function groupTransactionsByCategoryId(transactions: TransactionRead[]) {
  return Object.groupBy(transactions, (tx) => tx.category?.name ?? "NONE");
}

export function generateExpensesChartConfigAndData(
  transactions: TransactionRead[],
  categories: TransactionCategoryRead[],
) {
  const expenses = getOutgoingTransactions(getTransactionsWithoutTransfers(transactions));
  const expensesGroupedByCategoryId = groupTransactionsByCategoryId(expenses);

  return {
    chartConfig: Object.fromEntries(
      new Map(
        Object.keys(expensesGroupedByCategoryId).map((category) => {
          const categoryName = categories.find((c) => c.id === category)?.name ?? "NONE";
          return [
            categoryName,
            {
              label: categoryName,
            },
          ];
        }),
      ),
    ) satisfies ChartConfig,
    chartData: Object.entries(expensesGroupedByCategoryId).map(([categoryId, txs]) => {
      return {
        category: categories.find((category) => category.id === categoryId)?.name ?? "NONE",
        total: txs?.reduce((prev, curr) => prev.add(curr.amount), new Decimal(0)).toNumber(),
      };
    }),
  };
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

      const isTransfer = !!tx.fromWallet && !!tx.toWallet;
      if (isTransfer) {
        if (tx.fromWallet?.id === filters.walletId) amountChange = amountChange.sub(tx.amount);
        if (tx.toWallet?.id === filters.walletId) amountChange = amountChange.add(tx.amount);
      } else {
        if (tx.fromWallet?.id) amountChange = amountChange.sub(tx.amount);
        if (tx.toWallet?.id) amountChange = amountChange.add(tx.amount);
      }

      acc.push({
        date: tx.date,
        amount: acc.length ? acc[acc.length - 1].amount.add(amountChange) : amountChange,
      });

      return acc;
    }, [])
    .filter((tx) =>
      filters.dateRange?.from && filters.dateRange.to
        ? isWithinInterval(tx.date, { start: filters.dateRange.from, end: filters.dateRange.to })
        : true,
    )
    .map((item) => ({ date: item.date, amount: item.amount.toNumber() }));
}
