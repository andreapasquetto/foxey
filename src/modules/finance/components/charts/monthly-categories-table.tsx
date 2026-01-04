"use client";

import { isSameMonth } from "date-fns";
import {
  currencyFormatter,
  unsignedPercentageFormatter,
} from "@/common/formatters";
import { ChartEmptyStateMessage } from "@/components/empty-state/chart-empty-state-message";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Transaction } from "@/db/types/finance";
import {
  calculatePercentagesByCategory,
  getIncomingTransactions,
  getOutgoingTransactions,
  getTransactionsWithoutTransfers,
} from "@/modules/finance/utils";

export function MonthlyCategoriesTable({
  transactions,
  selectedMonth,
}: {
  transactions: Transaction[];
  selectedMonth: Date;
}) {
  const filteredTransactions = transactions.filter((tx) =>
    isSameMonth(tx.datetime, selectedMonth),
  );

  if (!transactions.length || !filteredTransactions.length) {
    return <ChartEmptyStateMessage />;
  }

  const tableData = {
    incoming: calculatePercentagesByCategory(
      getIncomingTransactions(
        getTransactionsWithoutTransfers(filteredTransactions),
      ),
    ),
    outgoing: calculatePercentagesByCategory(
      getOutgoingTransactions(
        getTransactionsWithoutTransfers(filteredTransactions),
      ),
    ),
  };

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      <Accordion type="single" collapsible defaultValue="income">
        <AccordionItem value="income">
          <AccordionTrigger>Income</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.incoming.map((category) => (
                  <TableRow key={category.category}>
                    <TableCell>{category.category}</TableCell>
                    <TableCell className="text-right">
                      <code>
                        {currencyFormatter.format(category.total.toNumber())}
                      </code>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      <code>
                        {unsignedPercentageFormatter.format(
                          category.percentage.toNumber(),
                        )}
                      </code>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible defaultValue="expenses">
        <AccordionItem value="expenses">
          <AccordionTrigger>Expenses</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.outgoing.map((category) => (
                  <TableRow key={category.category}>
                    <TableCell>{category.category}</TableCell>
                    <TableCell className="text-right">
                      <code>
                        {currencyFormatter.format(category.total.toNumber())}
                      </code>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      <code>
                        {unsignedPercentageFormatter.format(
                          category.percentage.toNumber(),
                        )}
                      </code>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
