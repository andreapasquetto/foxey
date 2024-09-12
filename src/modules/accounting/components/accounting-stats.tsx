"use client";

import { lastMonthRange, monthToDateRange } from "@/common/dates";
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

export default function AccountingStats() {
  const transactionsMonthToDateQuery = useTransactionsGetAllQuery({
    dateRange: monthToDateRange(),
  });
  const transactionsLastMonthQuery = useTransactionsGetAllQuery({ dateRange: lastMonthRange() });

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
    <Card>
      <CardHeader>
        <CardTitle>Stats</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Income this month</CardDescription>
                {isFetching && (
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-10" />
                  </div>
                )}
                {!isFetching && (
                  <CardTitle className="flex items-center gap-2">
                    {currencyFormatter.format(totalAmounts.thisMonth.incoming.toNumber())}
                    <Badge variant="outline">
                      {percentageFormatter.format(
                        calculatePercentageChange(
                          totalAmounts.lastMonth.incoming,
                          totalAmounts.thisMonth.incoming,
                        ).toNumber(),
                      )}
                    </Badge>
                  </CardTitle>
                )}
              </CardHeader>
              <CardContent>
                {isFetching && <Skeleton className="h-4 w-28" />}
                {!isFetching && (
                  <p className="text-xs text-muted-foreground">
                    {currencyFormatter.format(totalAmounts.lastMonth.incoming.toNumber())} last
                    month
                  </p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Expenses this month</CardDescription>
                {isFetching && (
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-10" />
                  </div>
                )}
                {!isFetching && (
                  <CardTitle className="flex items-center gap-2">
                    {currencyFormatter.format(totalAmounts.thisMonth.outgoing.toNumber())}
                    <Badge variant="outline">
                      {percentageFormatter.format(
                        calculatePercentageChange(
                          totalAmounts.lastMonth.outgoing,
                          totalAmounts.thisMonth.outgoing,
                        ).toNumber(),
                      )}
                    </Badge>
                  </CardTitle>
                )}
              </CardHeader>
              <CardContent>
                {isFetching && <Skeleton className="h-4 w-28" />}
                {!isFetching && (
                  <p className="text-xs text-muted-foreground">
                    {currencyFormatter.format(totalAmounts.lastMonth.outgoing.toNumber())} last
                    month
                  </p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Saved</CardDescription>
                {isFetching && (
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-10" />
                  </div>
                )}
                {!isFetching && (
                  <CardTitle className="flex items-center gap-2">
                    {currencyFormatter.format(savings.thisMonth.toNumber())}
                    <Badge variant="outline">
                      {percentageFormatter.format(
                        calculatePercentageChange(savings.lastMonth, savings.thisMonth).toNumber(),
                      )}
                    </Badge>
                  </CardTitle>
                )}
              </CardHeader>
              <CardContent>
                {isFetching && <Skeleton className="h-4 w-28" />}
                {!isFetching && (
                  <p className="text-xs text-muted-foreground">
                    {currencyFormatter.format(savings.lastMonth.toNumber())} last month
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
