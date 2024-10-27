"use client";

import { lastMonthRange, thisMonthToDateRange } from "@/common/dates";
import { currencyFormatter, percentageFormatter } from "@/common/formatters";
import { calculatePercentageChange } from "@/common/math";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTransactionsGetAllQuery } from "@/modules/accounting/accounting-queries";
import {
  calculateTransactionsAmount,
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
      incoming: calculateTransactionsAmount(transactions.thisMonth.incoming),
      outgoing: calculateTransactionsAmount(transactions.thisMonth.outgoing),
    },
    lastMonth: {
      incoming: calculateTransactionsAmount(transactions.lastMonth.incoming),
      outgoing: calculateTransactionsAmount(transactions.lastMonth.outgoing),
    },
  };

  const savings = {
    thisMonth: totalAmounts.thisMonth.incoming.sub(totalAmounts.thisMonth.outgoing),
    lastMonth: totalAmounts.lastMonth.incoming.sub(totalAmounts.lastMonth.outgoing),
  };

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      <IncomeCard
        isLoading={isFetching}
        thisMonth={totalAmounts.thisMonth.incoming.toNumber()}
        lastMonth={totalAmounts.lastMonth.incoming.toNumber()}
      />
      <ExpensesCard
        isLoading={isFetching}
        thisMonth={totalAmounts.thisMonth.outgoing.toNumber()}
        lastMonth={totalAmounts.lastMonth.outgoing.toNumber()}
      />
      <SavingCard
        isLoading={isFetching}
        thisMonth={savings.thisMonth.toNumber()}
        lastMonth={savings.lastMonth.toNumber()}
      />
    </div>
  );
}

function IncomeCard(props: { isLoading: boolean; thisMonth: number; lastMonth: number }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>Income</CardDescription>
        {props.isLoading && (
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-10" />
          </div>
        )}
        {!props.isLoading && (
          <CardTitle className="flex items-center gap-2">
            {currencyFormatter.format(props.thisMonth)}
            <Badge variant="outline" className="hidden sm:inline-block">
              {percentageFormatter.format(
                calculatePercentageChange(props.lastMonth, props.thisMonth).toNumber(),
              )}
            </Badge>
          </CardTitle>
        )}
      </CardHeader>
      <CardContent>
        {props.isLoading && <Skeleton className="h-4 w-28" />}
        {!props.isLoading && (
          <p className="text-xs text-muted-foreground">
            {currencyFormatter.format(props.lastMonth)} last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function ExpensesCard(props: { isLoading: boolean; thisMonth: number; lastMonth: number }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>Expenses</CardDescription>
        {props.isLoading && (
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-10" />
          </div>
        )}
        {!props.isLoading && (
          <CardTitle className="flex items-center gap-2">
            {currencyFormatter.format(props.thisMonth)}
            <Badge variant="outline" className="hidden sm:inline-block">
              {percentageFormatter.format(
                calculatePercentageChange(props.lastMonth, props.thisMonth).toNumber(),
              )}
            </Badge>
          </CardTitle>
        )}
      </CardHeader>
      <CardContent>
        {props.isLoading && <Skeleton className="h-4 w-28" />}
        {!props.isLoading && (
          <p className="text-xs text-muted-foreground">
            {currencyFormatter.format(props.lastMonth)} last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function SavingCard(props: { isLoading: boolean; thisMonth: number; lastMonth: number }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>Saved</CardDescription>
        {props.isLoading && (
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-10" />
          </div>
        )}
        {!props.isLoading && (
          <CardTitle className="flex items-center gap-2">
            {currencyFormatter.format(props.thisMonth)}
            <Badge variant="outline" className="hidden sm:inline-block">
              {percentageFormatter.format(
                calculatePercentageChange(props.lastMonth, props.thisMonth).toNumber(),
              )}
            </Badge>
          </CardTitle>
        )}
      </CardHeader>
      <CardContent>
        {props.isLoading && <Skeleton className="h-4 w-28" />}
        {!props.isLoading && (
          <p className="text-xs text-muted-foreground">
            {currencyFormatter.format(props.lastMonth)} last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}
