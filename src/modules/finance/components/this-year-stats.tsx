"use client";

import { currencyFormatter, percentageFormatter } from "@/common/formatters";
import { lastYearRange, thisYearRange } from "@/common/utils/dates";
import { calculatePercentageChange } from "@/common/utils/math";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useTransactionsGetAllQuery } from "@/modules/finance/finance-queries";
import {
  calculateTotal,
  getIncomingTransactions,
  getOutgoingTransactions,
  getTransactionsWithoutTransfers,
} from "@/modules/finance/finance-utils";
import { eachDayOfInterval, endOfYear, startOfToday, startOfYear, sub } from "date-fns";
import { Decimal } from "decimal.js";

export function ThisYearStats() {
  const transactionsThisYearQuery = useTransactionsGetAllQuery({
    dateRange: thisYearRange(),
  });
  const transactionsLastYearQuery = useTransactionsGetAllQuery({
    dateRange: lastYearRange(),
  });

  const isFetching = transactionsThisYearQuery.isFetching || transactionsLastYearQuery.isFetching;

  if (isFetching) {
    return <ComponentSkeleton />;
  }

  const transactionsWithoutTransfers = {
    thisYear: getTransactionsWithoutTransfers(transactionsThisYearQuery.data ?? []),
    lastYear: getTransactionsWithoutTransfers(transactionsLastYearQuery.data ?? []),
  };

  const transactions = {
    thisYear: {
      incoming: getIncomingTransactions(transactionsWithoutTransfers.thisYear),
      outgoing: getOutgoingTransactions(transactionsWithoutTransfers.thisYear),
    },
    lastYear: {
      incoming: getIncomingTransactions(transactionsWithoutTransfers.lastYear),
      outgoing: getOutgoingTransactions(transactionsWithoutTransfers.lastYear),
    },
  };

  const totalAmounts = {
    thisYear: {
      incoming: calculateTotal(transactions.thisYear.incoming),
      outgoing: calculateTotal(transactions.thisYear.outgoing),
    },
    lastYear: {
      incoming: calculateTotal(transactions.lastYear.incoming),
      outgoing: calculateTotal(transactions.lastYear.outgoing),
    },
  };

  const savings = {
    thisYear: totalAmounts.thisYear.incoming.sub(totalAmounts.thisYear.outgoing),
    lastYear: totalAmounts.lastYear.incoming.sub(totalAmounts.lastYear.outgoing),
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <IncomeCard
        thisYear={totalAmounts.thisYear.incoming}
        lastYear={totalAmounts.lastYear.incoming}
      />
      <ExpensesCard
        thisYear={totalAmounts.thisYear.outgoing}
        lastYear={totalAmounts.lastYear.outgoing}
      />
      <SavingCard
        thisYearIncome={totalAmounts.thisYear.incoming}
        thisYearSavings={savings.thisYear}
        lastYearSavings={savings.lastYear}
      />
      <CostPerDay
        thisYearExpenses={totalAmounts.thisYear.outgoing}
        lastYearExpenses={totalAmounts.lastYear.outgoing}
      />
    </div>
  );
}

function IncomeCard(props: { thisYear: Decimal; lastYear: Decimal }) {
  const percentageFromLastYear = calculatePercentageChange(props.lastYear, props.thisYear);

  return (
    <div>
      <CardHeader className="pb-2">
        <CardDescription>Income</CardDescription>
        <CardTitle className="flex items-center gap-2">
          {currencyFormatter.format(props.thisYear.toNumber())}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground">
            {currencyFormatter.format(props.lastYear.toNumber())}
          </span>{" "}
          last year
          {!props.lastYear.isZero() && (
            <>
              ,{" "}
              <span
                className={cn({
                  "text-red-500": percentageFromLastYear.lessThan(0),
                  "text-green-500": percentageFromLastYear.greaterThan(0),
                })}
              >
                {percentageFormatter.format(percentageFromLastYear.toNumber())}
              </span>
            </>
          )}
        </p>
      </CardContent>
    </div>
  );
}

function ExpensesCard(props: { thisYear: Decimal; lastYear: Decimal }) {
  const percentageFromLastYear = calculatePercentageChange(props.lastYear, props.thisYear);

  return (
    <div>
      <CardHeader className="pb-2">
        <CardDescription>Expenses</CardDescription>
        <CardTitle className="flex items-center gap-2">
          {currencyFormatter.format(props.thisYear.toNumber())}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground">
            {currencyFormatter.format(props.lastYear.toNumber())}
          </span>{" "}
          last year
          {!props.lastYear.isZero() && (
            <>
              ,{" "}
              <span
                className={cn({
                  "text-red-500": percentageFromLastYear.greaterThan(0),
                  "text-green-500": percentageFromLastYear.lessThan(0),
                })}
              >
                {percentageFormatter.format(percentageFromLastYear.toNumber())}
              </span>
            </>
          )}
        </p>
      </CardContent>
    </div>
  );
}

function SavingCard(props: {
  thisYearIncome: Decimal;
  thisYearSavings: Decimal;
  lastYearSavings: Decimal;
}) {
  const thisYearPercentage = props.thisYearSavings.div(props.thisYearIncome);
  const percentageChange = calculatePercentageChange(props.lastYearSavings, props.thisYearSavings);

  return (
    <div>
      <CardHeader className="pb-2">
        <CardDescription>Saved</CardDescription>
        <CardTitle className="flex items-center gap-2">
          {currencyFormatter.format(props.thisYearSavings.toNumber())}
          {!props.thisYearIncome.isZero() && (
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
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground">
            {currencyFormatter.format(props.lastYearSavings.toNumber())}
          </span>{" "}
          last year
          {!props.lastYearSavings.isZero() && (
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
      </CardContent>
    </div>
  );
}

function CostPerDay(props: { thisYearExpenses: Decimal; lastYearExpenses: Decimal }) {
  const today = startOfToday();
  const numberOfDays = {
    thisYear: eachDayOfInterval({
      start: startOfYear(today),
      end: endOfYear(today),
    }).length,
    lastYear: eachDayOfInterval({
      start: startOfYear(sub(today, { years: 1 })),
      end: endOfYear(sub(today, { years: 1 })),
    }).length,
  };

  return (
    <div>
      <CardHeader className="pb-2">
        <CardDescription>Cost per day</CardDescription>
        <CardTitle>
          {currencyFormatter.format(props.thisYearExpenses.div(numberOfDays.thisYear).toNumber())}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground">
            {currencyFormatter.format(props.lastYearExpenses.div(numberOfDays.lastYear).toNumber())}
          </span>{" "}
          last year
        </p>
      </CardContent>
    </div>
  );
}

function ComponentSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <div>
        <CardHeader className="pb-2">
          <CardDescription>Income</CardDescription>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-28" />
        </CardContent>
      </div>
      <div>
        <CardHeader className="pb-2">
          <CardDescription>Expenses</CardDescription>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-28" />
        </CardContent>
      </div>
      <div>
        <CardHeader className="pb-2">
          <CardDescription>Saved</CardDescription>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-28" />
        </CardContent>
      </div>
      <div>
        <CardHeader className="pb-2">
          <CardDescription>Cost per day</CardDescription>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-28" />
        </CardContent>
      </div>
    </div>
  );
}
