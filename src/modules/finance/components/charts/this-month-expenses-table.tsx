"use client";

import { currencyFormatter, unsignedPercentageFormatter } from "@/common/formatters";
import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
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
  getOutgoingTransactions,
  getTransactionsWithoutTransfers,
} from "@/modules/finance/finance-utils";
import { isSameMonth, startOfToday } from "date-fns";

export function ThisMonthExpensesTable(props: { transactions: Transaction[] }) {
  const { transactions } = props;

  const filteredTransactions = transactions.filter((tx) =>
    isSameMonth(startOfToday(), tx.datetime),
  );

  if (!transactions.length || !filteredTransactions.length) {
    return <EmptyStateMessage message="Not enough data." />;
  }

  const chartData = calculatePercentagesByCategory(
    getOutgoingTransactions(getTransactionsWithoutTransfers(filteredTransactions)),
  );

  return (
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
  );
}
