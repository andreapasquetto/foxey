"use client";

import { currencyFormatter, unsignedPercentageFormatter } from "@/common/formatters";
import { CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Transaction } from "@/db/types/finance";
import {
  calculatePercentagesByCategory,
  getIncomingTransactions,
  getTransactionsWithoutTransfers,
} from "@/modules/finance/finance-utils";
import { isSameMonth, startOfToday } from "date-fns";

export function ThisMonthIncomeTable(props: { transactions: Transaction[] }) {
  const { transactions } = props;

  const filteredTransactions = transactions.filter((tx) =>
    isSameMonth(startOfToday(), tx.datetime),
  );

  if (!transactions.length || !filteredTransactions.length) {
    return <ComponentEmptyState />;
  }

  const chartData = calculatePercentagesByCategory(
    getIncomingTransactions(getTransactionsWithoutTransfers(filteredTransactions)),
  );

  return (
    <div className="space-y-3">
      <CardTitle>Income</CardTitle>
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

function ComponentEmptyState() {
  return (
    <div>
      <CardTitle>Income</CardTitle>
      <div className="my-12">
        <p className="text-center text-sm text-muted-foreground">Not enough data.</p>
      </div>
    </div>
  );
}
