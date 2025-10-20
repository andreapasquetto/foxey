import { groupBy } from "@/common/utils/arrays";
import { Transaction } from "@/db/types/finance";
import {
  eachDayOfInterval,
  eachMonthOfInterval,
  endOfMonth,
  endOfYear,
  format,
  isSameDay,
  isSameMonth,
  isSameYear,
  startOfMonth,
  startOfYear,
} from "date-fns";
import { Decimal } from "decimal.js";

export function getTransactionsWithoutTransfers(transactions: Transaction[]) {
  return transactions.filter(
    (transaction) => !(transaction.fromWalletId && transaction.toWalletId),
  );
}

export function getIncomingTransactions(transactions: Transaction[]) {
  return transactions.filter((transaction) => transaction.toWalletId);
}

export function getOutgoingTransactions(transactions: Transaction[]) {
  return transactions.filter((transaction) => transaction.fromWalletId);
}

export function calculateTotal(transactions: Transaction[]) {
  return transactions.reduce((acc, curr) => acc.add(new Decimal(curr.amount)), new Decimal(0));
}

export function calculatePercentagesByCategory(transactions: Transaction[]) {
  const transactionsGroupedByCategory = groupBy(
    transactions,
    (transaction) => transaction.category?.name ?? "NONE",
  );
  const transactionsTotal = calculateTotal(transactions);

  return Object.entries(transactionsGroupedByCategory)
    .map(([categoryName, transactions]) => {
      const categoryTotal = calculateTotal(transactions);
      return {
        category: categoryName,
        total: categoryTotal,
        percentage: categoryTotal.div(transactionsTotal),
      };
    })
    .toSorted((a, b) => b.total.toNumber() - a.total.toNumber());
}

export function generateMonthExpensesPerDayChartData(params: {
  transactions: Transaction[];
  month: Date;
}) {
  const { transactions, month } = params;
  if (!transactions.length) return [];

  const days = eachDayOfInterval({
    start: startOfMonth(month),
    end: endOfMonth(month),
  });

  const result = days.map((day) => {
    const dayTransactions = transactions.filter((transaction) =>
      isSameDay(transaction.datetime, day),
    );

    return {
      day: format(day, "dd"),
      amount: dayTransactions.length
        ? calculateTotal(
            getTransactionsWithoutTransfers(getOutgoingTransactions(dayTransactions)),
          ).toNumber()
        : 0,
    };
  });

  return result;
}

export function generateMonthTrendChartData(params: { transactions: Transaction[]; month: Date }) {
  const { transactions, month } = params;

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
    .filter((t) => isSameMonth(t.datetime, month))
    .map((item) => ({ ...item, amount: item.amount.toNumber() }));
}

export function generateYearTrendChartData(params: { transactions: Transaction[]; year: Date }) {
  const { transactions, year } = params;

  if (!transactions.length) return [];

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
    .filter((t) => isSameYear(t.datetime, year))
    .map((item) => ({ ...item, amount: item.amount.toNumber() }));
}

export function generateYearIncomeExpensesSavingsChartData(params: {
  transactions: Transaction[];
  year: Date;
}) {
  const { transactions, year } = params;

  if (!transactions.length) return [];

  const months = eachMonthOfInterval({
    start: startOfYear(year),
    end: endOfYear(year),
  });

  if (!months.length) return [];

  return months.map((month) => {
    const monthTransactions = transactions.filter((transaction) =>
      isSameMonth(transaction.datetime, month),
    );

    const income = calculateTotal(
      getTransactionsWithoutTransfers(getIncomingTransactions(monthTransactions)),
    );
    const expenses = calculateTotal(
      getTransactionsWithoutTransfers(getOutgoingTransactions(monthTransactions)),
    );

    return {
      month: format(month, "MMM"),
      income: income.toNumber(),
      expenses: expenses.toNumber(),
      savings: income.sub(expenses).toNumber(),
    };
  });
}
