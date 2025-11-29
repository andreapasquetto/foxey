"use client";

import {
  eachDayOfInterval,
  endOfYear,
  isSameYear,
  startOfToday,
  startOfYear,
  sub,
} from "date-fns";
import type { Decimal } from "decimal.js";
import { currencyFormatter, percentageFormatter } from "@/common/formatters";
import { calculatePercentageChange } from "@/common/utils/math";
import { Badge } from "@/components/ui/badge";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import type { Transaction } from "@/db/types/finance";
import { cn } from "@/lib/utils";
import {
  calculateTotal,
  getIncomingTransactions,
  getOutgoingTransactions,
  getTransactionsWithoutTransfers,
} from "@/modules/finance/finance-utils";

export function YearlyStats({
  transactions,
  selectedYear,
}: {
  transactions: Transaction[];
  selectedYear: Date;
}) {
  const currentYearTransactions = transactions.filter((tx) =>
    isSameYear(tx.datetime, selectedYear),
  );
  const previousYearTransactions = transactions.filter((tx) =>
    isSameYear(tx.datetime, sub(selectedYear, { years: 1 })),
  );

  const transactionsWithoutTransfers = {
    currentYear: getTransactionsWithoutTransfers(currentYearTransactions),
    previousYear: getTransactionsWithoutTransfers(previousYearTransactions),
  };

  const transactionsByYear = {
    currentYear: {
      incoming: getIncomingTransactions(
        transactionsWithoutTransfers.currentYear,
      ),
      outgoing: getOutgoingTransactions(
        transactionsWithoutTransfers.currentYear,
      ),
    },
    previousYear: {
      incoming: getIncomingTransactions(
        transactionsWithoutTransfers.previousYear,
      ),
      outgoing: getOutgoingTransactions(
        transactionsWithoutTransfers.previousYear,
      ),
    },
  };

  const totalAmounts = {
    currentYear: {
      incoming: calculateTotal(transactionsByYear.currentYear.incoming),
      outgoing: calculateTotal(transactionsByYear.currentYear.outgoing),
    },
    previousYear: {
      incoming: calculateTotal(transactionsByYear.previousYear.incoming),
      outgoing: calculateTotal(transactionsByYear.previousYear.outgoing),
    },
  };

  const savings = {
    currentYear: totalAmounts.currentYear.incoming.sub(
      totalAmounts.currentYear.outgoing,
    ),
    previousYear: totalAmounts.previousYear.incoming.sub(
      totalAmounts.previousYear.outgoing,
    ),
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <IncomeCard
        current={totalAmounts.currentYear.incoming}
        previous={totalAmounts.previousYear.incoming}
      />
      <ExpensesCard
        current={totalAmounts.currentYear.outgoing}
        previous={totalAmounts.previousYear.outgoing}
      />
      <SavingCard
        currentIncome={totalAmounts.currentYear.incoming}
        currentSavings={savings.currentYear}
        previousSavings={savings.previousYear}
      />
      <CostPerDay
        current={totalAmounts.currentYear.outgoing}
        previous={totalAmounts.previousYear.outgoing}
      />
    </div>
  );
}

function IncomeCard(props: { current: Decimal; previous: Decimal }) {
  const percentageFromPrevious = calculatePercentageChange(
    props.previous,
    props.current,
  );

  return (
    <Item variant="outline">
      <ItemContent>
        <ItemDescription>Income</ItemDescription>
        <ItemTitle>
          {currencyFormatter.format(props.current.toNumber())}
        </ItemTitle>
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground">
            {currencyFormatter.format(props.previous.toNumber())}
          </span>{" "}
          previous year
          {!props.previous.isZero() && (
            <>
              ,{" "}
              <span
                className={cn({
                  "text-red-500": percentageFromPrevious.lessThan(0),
                  "text-green-500": percentageFromPrevious.greaterThan(0),
                })}
              >
                {percentageFormatter.format(percentageFromPrevious.toNumber())}
              </span>
            </>
          )}
        </p>
      </ItemContent>
    </Item>
  );
}

function ExpensesCard(props: { current: Decimal; previous: Decimal }) {
  const percentageFromPrevious = calculatePercentageChange(
    props.previous,
    props.current,
  );

  return (
    <Item variant="outline">
      <ItemContent>
        <ItemDescription>Expenses</ItemDescription>
        <ItemTitle>
          {currencyFormatter.format(props.current.toNumber())}
        </ItemTitle>
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground">
            {currencyFormatter.format(props.previous.toNumber())}
          </span>{" "}
          previous year
          {!props.previous.isZero() && (
            <>
              ,{" "}
              <span
                className={cn({
                  "text-red-500": percentageFromPrevious.greaterThan(0),
                  "text-green-500": percentageFromPrevious.lessThan(0),
                })}
              >
                {percentageFormatter.format(percentageFromPrevious.toNumber())}
              </span>
            </>
          )}
        </p>
      </ItemContent>
    </Item>
  );
}

function SavingCard(props: {
  currentIncome: Decimal;
  currentSavings: Decimal;
  previousSavings: Decimal;
}) {
  const thisYearPercentage = props.currentSavings.div(props.currentIncome);
  const percentageChange = calculatePercentageChange(
    props.previousSavings,
    props.currentSavings,
  );

  return (
    <Item variant="outline">
      <ItemContent>
        <ItemDescription>Savings</ItemDescription>
        <ItemTitle className="flex items-center gap-2">
          {currencyFormatter.format(props.currentSavings.toNumber())}
          {!props.currentIncome.isZero() && (
            <Badge
              variant="outline"
              className={cn({
                "border-red-500": thisYearPercentage.lessThan(0),
                "border-green-500": thisYearPercentage.greaterThan(0),
              })}
            >
              {percentageFormatter.format(thisYearPercentage.toNumber())}
            </Badge>
          )}
        </ItemTitle>
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground">
            {currencyFormatter.format(props.previousSavings.toNumber())}
          </span>{" "}
          previous year
          {!props.previousSavings.isZero() && (
            <>
              ,{" "}
              <span
                className={cn({
                  "text-red-500": percentageChange.lessThan(0),
                  "text-green-500": percentageChange.greaterThan(0),
                })}
              >
                {percentageFormatter.format(percentageChange.toNumber())}
              </span>
            </>
          )}
        </p>
      </ItemContent>
    </Item>
  );
}

function CostPerDay(props: { current: Decimal; previous: Decimal }) {
  const today = startOfToday();
  const numberOfDays = {
    currentYear: eachDayOfInterval({
      start: startOfYear(today),
      end: endOfYear(today),
    }).length,
    previousYear: eachDayOfInterval({
      start: startOfYear(sub(today, { years: 1 })),
      end: endOfYear(sub(today, { years: 1 })),
    }).length,
  };

  return (
    <Item variant="outline">
      <ItemContent>
        <ItemDescription>Cost per day</ItemDescription>
        <ItemTitle>
          {currencyFormatter.format(
            props.current.div(numberOfDays.currentYear).toNumber(),
          )}
        </ItemTitle>
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground">
            {currencyFormatter.format(
              props.previous.div(numberOfDays.previousYear).toNumber(),
            )}
          </span>{" "}
          previous year
        </p>
      </ItemContent>
    </Item>
  );
}
