import { ChartConfig } from "@/components/ui/chart";
import { TransactionRead } from "@/modules/accounting/schemas/transaction-read-schema";
import { isWithinInterval } from "date-fns";
import { Decimal } from "decimal.js";
import { DateRange } from "react-day-picker";

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

export function groupTransactionsByCategoryName(transactions: TransactionRead[]) {
  return Object.groupBy(transactions, (tx) => tx.category?.name ?? "NONE");
}

export function generateExpensesChartConfigAndData(transactions: TransactionRead[]) {
  const expenses = getOutgoingTransactions(getTransactionsWithoutTransfers(transactions));
  const expensesGroupedByCategoryName = groupTransactionsByCategoryName(expenses);

  return {
    chartConfig: Object.fromEntries(
      new Map(
        Object.keys(expensesGroupedByCategoryName).map((category) => {
          return [
            category,
            {
              label: category,
            },
          ];
        }),
      ),
    ) satisfies ChartConfig,
    chartData: Object.entries(expensesGroupedByCategoryName).map(([categoryName, txs]) => {
      return {
        category: categoryName,
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
        datetime: Date;
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
        datetime: tx.datetime,
        amount: acc.length ? acc[acc.length - 1].amount.add(amountChange) : amountChange,
      });

      return acc;
    }, [])
    .filter((tx) =>
      filters.dateRange?.from && filters.dateRange.to
        ? isWithinInterval(tx.datetime, {
            start: filters.dateRange.from,
            end: filters.dateRange.to,
          })
        : true,
    )
    .map((item) => ({ datetime: item.datetime, amount: item.amount.toNumber() }));
}
