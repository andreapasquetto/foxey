"use client";

import { currencyFormatter, unsignedPercentageFormatter } from "@/common/formatters";
import { thisMonthToDateRange } from "@/common/utils/dates";
import { CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTransactionsGetAllQuery } from "@/modules/accounting/accounting-queries";
import {
  calculatePercentagesByCategory,
  getOutgoingTransactions,
  getTransactionsWithoutTransfers,
} from "@/modules/accounting/accounting-utils";

export function ThisMonthExpensesTable() {
  const query = useTransactionsGetAllQuery({
    dateRange: thisMonthToDateRange(),
  });

  if (query.isFetching) {
    return <ComponentSkeleton />;
  }

  const transactions = query.data ?? [];

  if (!transactions.length) {
    return <ComponentEmptyState />;
  }

  const chartData = calculatePercentagesByCategory(
    getOutgoingTransactions(getTransactionsWithoutTransfers(transactions)),
  );

  return (
    <div className="space-y-3">
      <CardTitle>Expenses</CardTitle>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>%</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chartData.map((category) => (
            <TableRow key={category.category}>
              <TableCell>{category.category}</TableCell>
              <TableCell>{currencyFormatter.format(category.total.toNumber())}</TableCell>
              <TableCell className="text-muted-foreground">
                {unsignedPercentageFormatter.format(category.percentage.toNumber())}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function TableHeaderRow() {
  return (
    <TableRow>
      <TableHead>Category</TableHead>
      <TableHead>Total</TableHead>
      <TableHead>%</TableHead>
    </TableRow>
  );
}

function TableRowsSkeleton() {
  return Array.from({ length: 3 }).map((_, i) => (
    <TableRow key={i}>
      <TableCell>
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-12" />
      </TableCell>
    </TableRow>
  ));
}

function ComponentSkeleton() {
  return (
    <div className="space-y-3">
      <CardTitle>Expenses</CardTitle>
      <Table>
        <TableHeader>
          <TableHeaderRow />
        </TableHeader>
        <TableBody>
          <TableRowsSkeleton />
        </TableBody>
      </Table>
    </div>
  );
}

function ComponentEmptyState() {
  return (
    <div>
      <CardTitle>Expenses</CardTitle>
      <div className="my-12">
        <p className="text-center text-sm text-muted-foreground">Not enough data.</p>
      </div>
    </div>
  );
}
