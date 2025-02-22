"use client";

import { currencyFormatter, percentageFormatter } from "@/common/formatters";
import { lastMonthRange, thisMonthToDateRange } from "@/common/utils/dates";
import { calculatePercentageChange } from "@/common/utils/math";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useTransactionsGetAllQuery } from "@/modules/accounting/accounting-queries";
import {
  calculateTotal,
  getIncomingTransactions,
  getOutgoingTransactions,
  getTransactionsWithoutTransfers,
} from "@/modules/accounting/accounting-utils";

export function ThisMonthStats() {
  const transactionsMonthToDateQuery = useTransactionsGetAllQuery({
    dateRange: thisMonthToDateRange(),
  });
  const transactionsLastMonthQuery = useTransactionsGetAllQuery({
    dateRange: lastMonthRange(),
  });

  const isFetching =
    transactionsMonthToDateQuery.isFetching || transactionsLastMonthQuery.isFetching;

  if (isFetching) {
    return <ComponentSkeleton />;
  }

  const transactionsWithoutTransfers = {
    thisMonth: getTransactionsWithoutTransfers(transactionsMonthToDateQuery.data ?? []),
    lastMonth: getTransactionsWithoutTransfers(transactionsLastMonthQuery.data ?? []),
  };

  const transactions = {
    thisMonth: {
      incoming: getIncomingTransactions(transactionsWithoutTransfers.thisMonth),
      outgoing: getOutgoingTransactions(transactionsWithoutTransfers.thisMonth),
    },
    lastMonth: {
      incoming: getIncomingTransactions(transactionsWithoutTransfers.lastMonth),
      outgoing: getOutgoingTransactions(transactionsWithoutTransfers.lastMonth),
    },
  };

  const totalAmounts = {
    thisMonth: {
      incoming: calculateTotal(transactions.thisMonth.incoming),
      outgoing: calculateTotal(transactions.thisMonth.outgoing),
    },
    lastMonth: {
      incoming: calculateTotal(transactions.lastMonth.incoming),
      outgoing: calculateTotal(transactions.lastMonth.outgoing),
    },
  };

  const savings = {
    thisMonth: totalAmounts.thisMonth.incoming.sub(totalAmounts.thisMonth.outgoing),
    lastMonth: totalAmounts.lastMonth.incoming.sub(totalAmounts.lastMonth.outgoing),
  };

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      <IncomeCard
        thisMonth={totalAmounts.thisMonth.incoming.toNumber()}
        lastMonth={totalAmounts.lastMonth.incoming.toNumber()}
      />
      <ExpensesCard
        thisMonth={totalAmounts.thisMonth.outgoing.toNumber()}
        lastMonth={totalAmounts.lastMonth.outgoing.toNumber()}
      />
      <SavingCard
        thisMonth={savings.thisMonth.toNumber()}
        lastMonth={savings.lastMonth.toNumber()}
      />
    </div>
  );
}

function IncomeCard(props: { thisMonth: number; lastMonth: number }) {
  const percentageFromLastMonth = calculatePercentageChange(
    props.lastMonth,
    props.thisMonth,
  ).toNumber();

  return (
    <div>
      <CardHeader className="pb-2">
        <CardDescription>Income</CardDescription>
        <CardTitle className="flex items-center gap-2">
          {currencyFormatter.format(props.thisMonth)}
          {props.lastMonth > 0 && !isNaN(percentageFromLastMonth) && (
            <Badge
              variant="outline"
              className={cn({
                "border-red-500": percentageFromLastMonth < 0,
                "border-green-500": percentageFromLastMonth > 0,
              })}
            >
              {percentageFormatter.format(percentageFromLastMonth)}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground">{currencyFormatter.format(props.lastMonth)}</span> last
          month
        </p>
      </CardContent>
    </div>
  );
}

function ExpensesCard(props: { thisMonth: number; lastMonth: number }) {
  const percentageFromLastMonth = calculatePercentageChange(
    props.lastMonth,
    props.thisMonth,
  ).toNumber();

  return (
    <div>
      <CardHeader className="pb-2">
        <CardDescription>Expenses</CardDescription>
        <CardTitle className="flex items-center gap-2">
          {currencyFormatter.format(props.thisMonth)}
          {props.lastMonth > 0 && !isNaN(percentageFromLastMonth) && (
            <Badge
              variant="outline"
              className={cn({
                "border-red-500": percentageFromLastMonth > 0,
                "border-green-500": percentageFromLastMonth < 0,
              })}
            >
              {percentageFormatter.format(percentageFromLastMonth)}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground">{currencyFormatter.format(props.lastMonth)}</span> last
          month
        </p>
      </CardContent>
    </div>
  );
}

function SavingCard(props: { thisMonth: number; lastMonth: number }) {
  const percentageFromLastMonth = calculatePercentageChange(
    props.lastMonth,
    props.thisMonth,
  ).toNumber();

  return (
    <div>
      <CardHeader className="pb-2">
        <CardDescription>Saved</CardDescription>
        <CardTitle className="flex items-center gap-2">
          {currencyFormatter.format(props.thisMonth)}
          {props.lastMonth !== 0 && !isNaN(percentageFromLastMonth) && (
            <Badge
              variant="outline"
              className={cn({
                "border-red-500": percentageFromLastMonth < 0,
                "border-green-500": percentageFromLastMonth > 0,
              })}
            >
              {percentageFormatter.format(percentageFromLastMonth)}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground">{currencyFormatter.format(props.lastMonth)}</span> last
          month
        </p>
      </CardContent>
    </div>
  );
}

function ComponentSkeleton() {
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
