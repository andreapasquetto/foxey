import { thisMonthRange, thisMonthToDateRange, thisYearRange } from "@/common/dates";
import { TransactionRead } from "@/modules/accounting/schemas/transaction-read-schema";
import {
  eachDayOfInterval,
  eachMonthOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  startOfMonth,
  startOfToday,
} from "date-fns";
import { Decimal } from "decimal.js";

export function getTransactionsWithoutTransfers(transactions: TransactionRead[]) {
  return transactions.filter(
    (transaction) => !(transaction.fromWalletId && transaction.toWalletId),
  );
}

export function getIncomingTransactions(transactions: TransactionRead[]) {
  return transactions.filter((transaction) => transaction.toWalletId);
}

export function getOutgoingTransactions(transactions: TransactionRead[]) {
  return transactions.filter((transaction) => transaction.fromWalletId);
}

export function calculateTransactionsAmount(transactions: TransactionRead[]) {
  return transactions.reduce((acc, curr) => acc.add(new Decimal(curr.amount)), new Decimal(0));
}

export function groupTransactionsByCategoryName(transactions: TransactionRead[]) {
  return Object.groupBy(transactions, (transaction) => transaction.category?.name ?? "NONE");
}

export function generateThisMonthExpensesPerDayChartData(transactions: TransactionRead[]) {
  if (!transactions.length) return [];

  const thisMonth = thisMonthRange();
  const days = eachDayOfInterval({ start: thisMonth.from!, end: thisMonth.to! });

  const result = days.map((day) => {
    const dayTransactions = transactions.filter((transaction) =>
      isSameDay(transaction.datetime, day),
    );

    return {
      day: format(day, "dd"),
      amount: dayTransactions.length
        ? calculateTransactionsAmount(
            getTransactionsWithoutTransfers(getOutgoingTransactions(dayTransactions)),
          ).toNumber()
        : 0,
    };
  });

  return result;
}

export function generateThisMonthExpensesPerDayPlaceholderData() {
  return eachDayOfInterval({
    start: startOfMonth(startOfToday()),
    end: endOfMonth(startOfToday()),
  }).map((day) => ({
    day: format(day, "dd"),
    amount: Math.trunc(Math.random() * 100),
  }));
}

export function generateThisMonthExpensesChartData(transactions: TransactionRead[]) {
  const expenses = getOutgoingTransactions(getTransactionsWithoutTransfers(transactions));
  const expensesGroupedByCategoryName = groupTransactionsByCategoryName(expenses);

  return Object.entries(expensesGroupedByCategoryName)
    .map(([categoryName, transactions]) => {
      return {
        category: categoryName,
        total: transactions
          ?.reduce((prev, curr) => prev.add(curr.amount), new Decimal(0))
          .toNumber(),
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

export function generateThisMonthTrendChartData(transactions: TransactionRead[]) {
  const monthToDate = thisMonthToDateRange();

  return transactions
    .reduce<
      Array<{
        datetime: Date;
        amount: Decimal;
      }>
    >((acc, transaction) => {
      let amountChange = new Decimal(0);

      const isTransfer = !!transaction.fromWalletId && !!transaction.toWalletId;
      if (!isTransfer) {
        if (transaction.fromWalletId) amountChange = amountChange.sub(transaction.amount);
        if (transaction.toWalletId) amountChange = amountChange.add(transaction.amount);
      }

      acc.push({
        datetime: transaction.datetime,
        amount: acc.length ? acc[acc.length - 1].amount.add(amountChange) : amountChange,
      });

      return acc;
    }, [])
    .filter((transaction) =>
      isWithinInterval(transaction.datetime, {
        start: monthToDate.from!,
        end: monthToDate.to!,
      }),
    )
    .map((item) => ({ ...item, amount: item.amount.toNumber() }));
}

export function generateThisYearTrendChartData(transactions: TransactionRead[]) {
  const thisYear = thisYearRange();

  return transactions
    .reduce<
      Array<{
        datetime: Date;
        amount: Decimal;
      }>
    >((acc, transaction) => {
      let amountChange = new Decimal(0);

      const isTransfer = !!transaction.fromWalletId && !!transaction.toWalletId;
      if (!isTransfer) {
        if (transaction.fromWalletId) amountChange = amountChange.sub(transaction.amount);
        if (transaction.toWalletId) amountChange = amountChange.add(transaction.amount);
      }

      acc.push({
        datetime: transaction.datetime,
        amount: acc.length ? acc[acc.length - 1].amount.add(amountChange) : amountChange,
      });

      return acc;
    }, [])
    .filter((transaction) =>
      isWithinInterval(transaction.datetime, {
        start: thisYear.from!,
        end: thisYear.to!,
      }),
    )
    .map((item) => ({ ...item, amount: item.amount.toNumber() }));
}

export function generateGenericTrendChartPlaceholderData() {
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

export function generateThisYearIncomeExpensesChartData(transactions: TransactionRead[]) {
  if (!transactions.length) return [];

  const thisYear = thisYearRange();
  const months = eachMonthOfInterval({ start: thisYear.from!, end: thisYear.to! });

  if (!months.length) return [];

  return months.map((month) => {
    const monthTransactions = transactions.filter((transaction) =>
      isSameMonth(transaction.datetime, month),
    );
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

export function generateThisYearIncomeExpensesChartPlaceholderData() {
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
