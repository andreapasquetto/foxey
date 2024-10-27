import { thisYearRange } from "@/common/dates";
import { TransactionRead } from "@/modules/accounting/schemas/transaction-read-schema";
import { eachMonthOfInterval, format, isSameMonth, isWithinInterval } from "date-fns";
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

export function generateThisMonthExpensesChartData(transactions: TransactionRead[]) {
  const expenses = getOutgoingTransactions(getTransactionsWithoutTransfers(transactions));
  const expensesGroupedByCategoryName = groupTransactionsByCategoryName(expenses);

  return Object.entries(expensesGroupedByCategoryName)
    .map(([categoryName, txs]) => {
      return {
        category: categoryName,
        total: txs?.reduce((prev, curr) => prev.add(curr.amount), new Decimal(0)).toNumber(),
      };
    })
    .toSorted((a, b) => (a.total ?? 0) - (b.total ?? 0));
}

export function generateThisMonthExpensesChartPlaceholderData() {
  return [
    {
      category: "internet",
      total: 60,
    },
    {
      category: "fuel",
      total: 85.4,
    },
    {
      category: "entertainment",
      total: 95.6,
    },
    {
      category: "utilities",
      total: 120.5,
    },
    {
      category: "clothing",
      total: 130,
    },
    {
      category: "restaurants",
      total: 180,
    },
    {
      category: "transportation",
      total: 200.25,
    },
    {
      category: "healthcare",
      total: 240,
    },
    {
      category: "groceries",
      total: 450.75,
    },
    {
      category: "rent",
      total: 1500,
    },
  ];
}

// TODO: remove walletId from filters
export function generateThisMonthTrendChartData(
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

export function generateThisMonthTrendChartPlaceholderData() {
  return [
    {
      datetime: "2024-10-01T00:00:00Z",
      amount: 52134.75,
    },
    {
      datetime: "2024-10-02T00:00:00Z",
      amount: 47890.4,
    },
    {
      datetime: "2024-10-03T00:00:00Z",
      amount: 51450.1,
    },
    {
      datetime: "2024-10-04T00:00:00Z",
      amount: 48720.5,
    },
    {
      datetime: "2024-10-05T00:00:00Z",
      amount: 53980.85,
    },
    {
      datetime: "2024-10-06T00:00:00Z",
      amount: 55500.4,
    },
    {
      datetime: "2024-10-07T00:00:00Z",
      amount: 49610.9,
    },
    {
      datetime: "2024-10-08T00:00:00Z",
      amount: 50875.15,
    },
    {
      datetime: "2024-10-09T00:00:00Z",
      amount: 56300,
    },
    {
      datetime: "2024-10-10T00:00:00Z",
      amount: 54160.7,
    },
  ].map((it) => ({ datetime: new Date(it.datetime), amount: it.amount }));
}

export function generateThisYearTrendChartData(
  transactions: TransactionRead[],
): { month: string; income: number | null; expenses: number | null }[] {
  if (!transactions.length) return [];

  const yearToDate = thisYearRange();

  const months = eachMonthOfInterval({ start: yearToDate.from!, end: yearToDate.to! });

  if (!months.length) return [];

  return months.map((month) => {
    const monthTransactions = transactions.filter((tx) => isSameMonth(tx.datetime, month));
    return {
      month: format(month, "MMM"),
      income: calculateTransactionsAmount(
        getTransactionsWithoutTransfers(getIncomingTransactions(monthTransactions)),
      ).toNumber(),
      expenses: calculateTransactionsAmount(
        getTransactionsWithoutTransfers(getOutgoingTransactions(monthTransactions)),
      ).toNumber(),
    };
  });
}

export function generateThisYearTrendChartPlaceholderData() {
  return [
    {
      month: "Jan",
      income: 5000,
      expenses: 3000,
    },
    {
      month: "Feb",
      income: 4500,
      expenses: 2500,
    },
    {
      month: "Mar",
      income: 5200,
      expenses: 3200,
    },
    {
      month: "Apr",
      income: 4800,
      expenses: 2700,
    },
    {
      month: "May",
      income: 5500,
      expenses: 3400,
    },
    {
      month: "Jun",
      income: 6100,
      expenses: 3900,
    },
    {
      month: "Jul",
      income: 5700,
      expenses: 3300,
    },
    {
      month: "Aug",
      income: 5900,
      expenses: 3600,
    },
    {
      month: "Sep",
      income: 6400,
      expenses: 4100,
    },
    {
      month: "Oct",
      income: 6200,
      expenses: 3800,
    },
    {
      month: "Nov",
      income: 6600,
      expenses: 4200,
    },
    {
      month: "Dec",
      income: 7000,
      expenses: 4500,
    },
  ];
}
