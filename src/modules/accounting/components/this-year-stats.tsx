"use client";

import { lastYearRange, thisYearRange } from "@/common/dates";
import { currencyFormatter, percentageFormatter } from "@/common/formatters";
import { calculatePercentageChange } from "@/common/math";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useTransactionsGetAllQuery } from "@/modules/accounting/accounting-queries";
import {
  calculateTransactionsAmount,
  getIncomingTransactions,
  getOutgoingTransactions,
  getTransactionsWithoutTransfers,
} from "@/modules/accounting/accounting-utils";

export function ThisYearStats() {
  const transactionsThisYearQuery = useTransactionsGetAllQuery({
    dateRange: thisYearRange(),
  });
  const transactionsLastYearQuery = useTransactionsGetAllQuery({
    dateRange: lastYearRange(),
  });

  const isFetching = transactionsThisYearQuery.isFetching || transactionsLastYearQuery.isFetching;

  if (isFetching) {
    return (
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
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
      </div>
    );
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
      incoming: calculateTransactionsAmount(transactions.thisYear.incoming),
      outgoing: calculateTransactionsAmount(transactions.thisYear.outgoing),
    },
    lastYear: {
      incoming: calculateTransactionsAmount(transactions.lastYear.incoming),
      outgoing: calculateTransactionsAmount(transactions.lastYear.outgoing),
    },
  };

  const savings = {
    thisYear: totalAmounts.thisYear.incoming.sub(totalAmounts.thisYear.outgoing),
    lastYear: totalAmounts.lastYear.incoming.sub(totalAmounts.lastYear.outgoing),
  };

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      <IncomeCard
        thisYear={totalAmounts.thisYear.incoming.toNumber()}
        lastYear={totalAmounts.lastYear.incoming.toNumber()}
      />
      <ExpensesCard
        thisYear={totalAmounts.thisYear.outgoing.toNumber()}
        lastYear={totalAmounts.lastYear.outgoing.toNumber()}
      />
      <SavingCard thisYear={savings.thisYear.toNumber()} lastYear={savings.lastYear.toNumber()} />
    </div>
  );
}

function IncomeCard(props: { thisYear: number; lastYear: number }) {
  const percentageFromLastYear = calculatePercentageChange(
    props.lastYear,
    props.thisYear,
  ).toNumber();

  return (
    <div>
      <CardHeader className="pb-2">
        <CardDescription>Income</CardDescription>
        <CardTitle className="flex items-center gap-2">
          {currencyFormatter.format(props.thisYear)}
          {props.lastYear > 0 && !isNaN(percentageFromLastYear) && (
            <Badge
              variant="outline"
              className={cn({
                "border-red-500": percentageFromLastYear < 0,
                "border-green-500": percentageFromLastYear > 0,
              })}
            >
              {percentageFormatter.format(percentageFromLastYear)}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">
          {currencyFormatter.format(props.lastYear)} last year
        </p>
      </CardContent>
    </div>
  );
}

function ExpensesCard(props: { thisYear: number; lastYear: number }) {
  const percentageFromLastYear = calculatePercentageChange(
    props.lastYear,
    props.thisYear,
  ).toNumber();

  return (
    <div>
      <CardHeader className="pb-2">
        <CardDescription>Expenses</CardDescription>
        <CardTitle className="flex items-center gap-2">
          {currencyFormatter.format(props.thisYear)}
          {props.lastYear > 0 && !isNaN(percentageFromLastYear) && (
            <Badge
              variant="outline"
              className={cn({
                "border-red-500": percentageFromLastYear > 0,
                "border-green-500": percentageFromLastYear < 0,
              })}
            >
              {percentageFormatter.format(percentageFromLastYear)}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">
          {currencyFormatter.format(props.lastYear)} last year
        </p>
      </CardContent>
    </div>
  );
}

function SavingCard(props: { thisYear: number; lastYear: number }) {
  const percentageFromLastYear = calculatePercentageChange(
    props.lastYear,
    props.thisYear,
  ).toNumber();

  return (
    <div>
      <CardHeader className="pb-2">
        <CardDescription>Saved</CardDescription>
        <CardTitle className="flex items-center gap-2">
          {currencyFormatter.format(props.thisYear)}
          {props.lastYear !== 0 && !isNaN(percentageFromLastYear) && (
            <Badge
              variant="outline"
              className={cn({
                "border-red-500": percentageFromLastYear < 0,
                "border-green-500": percentageFromLastYear > 0,
              })}
            >
              {percentageFormatter.format(percentageFromLastYear)}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">
          {currencyFormatter.format(props.lastYear)} last year
        </p>
      </CardContent>
    </div>
  );
}
