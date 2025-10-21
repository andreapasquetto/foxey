"use client";

import { currencyFormatter, unsignedPercentageFormatter } from "@/common/formatters";
import { ChartEmptyStateMessage } from "@/components/empty-state/chart-empty-state-message";
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
  getOutgoingTransactions,
  getTransactionsWithoutTransfers,
} from "@/modules/finance/finance-utils";
import { isSameYear } from "date-fns";

export function YearlyCategoriesTable({
  transactions,
  selectedYear,
}: {
  transactions: Transaction[];
  selectedYear: Date;
}) {
  const filteredTransactions = transactions.filter((tx) => isSameYear(tx.datetime, selectedYear));

  if (!transactions.length || !filteredTransactions.length) {
    return <ChartEmptyStateMessage />;
  }

  const tableData = {
    incoming: calculatePercentagesByCategory(
      getIncomingTransactions(getTransactionsWithoutTransfers(filteredTransactions)),
    ),
    outgoing: calculatePercentagesByCategory(
      getOutgoingTransactions(getTransactionsWithoutTransfers(filteredTransactions)),
    ),
  };

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>%</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.incoming.map((category) => (
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>%</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.outgoing.map((category) => (
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
