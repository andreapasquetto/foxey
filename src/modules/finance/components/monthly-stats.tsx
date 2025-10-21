"use client";

import { currencyFormatter, percentageFormatter } from "@/common/formatters";
import { calculatePercentageChange } from "@/common/utils/math";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/db/types/finance";
import { cn } from "@/lib/utils";
import {
  calculateTotal,
  getIncomingTransactions,
  getOutgoingTransactions,
  getTransactionsWithoutTransfers,
} from "@/modules/finance/finance-utils";
import { isSameMonth, sub } from "date-fns";
import { Decimal } from "decimal.js";

export function MonthlyStats({
  transactions,
  selectedMonth,
}: {
  transactions: Transaction[];
  selectedMonth: Date;
}) {
  const currentTransactions = transactions.filter((tx) => isSameMonth(tx.datetime, selectedMonth));
  const previousTransactions = transactions.filter((tx) =>
    isSameMonth(tx.datetime, sub(selectedMonth, { months: 1 })),
  );

  const transactionsWithoutTransfers = {
    current: getTransactionsWithoutTransfers(currentTransactions),
    previous: getTransactionsWithoutTransfers(previousTransactions),
  };

  const transactionsByMonth = {
    current: {
      incoming: getIncomingTransactions(transactionsWithoutTransfers.current),
      outgoing: getOutgoingTransactions(transactionsWithoutTransfers.current),
    },
    previous: {
      incoming: getIncomingTransactions(transactionsWithoutTransfers.previous),
      outgoing: getOutgoingTransactions(transactionsWithoutTransfers.previous),
    },
  };

  const totalAmounts = {
    current: {
      incoming: calculateTotal(transactionsByMonth.current.incoming),
      outgoing: calculateTotal(transactionsByMonth.current.outgoing),
    },
    previous: {
      incoming: calculateTotal(transactionsByMonth.previous.incoming),
      outgoing: calculateTotal(transactionsByMonth.previous.outgoing),
    },
  };

  const savings = {
    current: totalAmounts.current.incoming.sub(totalAmounts.current.outgoing),
    previous: totalAmounts.previous.incoming.sub(totalAmounts.previous.outgoing),
  };

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      <IncomeCard
        current={totalAmounts.current.incoming}
        previous={totalAmounts.previous.incoming}
      />
      <ExpensesCard
        current={totalAmounts.current.outgoing}
        previous={totalAmounts.previous.outgoing}
      />
      <SavingCard
        currentIncome={totalAmounts.current.incoming}
        currentSavings={savings.current}
        previousSavings={savings.previous}
      />
    </div>
  );
}

function IncomeCard(props: { current: Decimal; previous: Decimal }) {
  const percentageFromPrevious = calculatePercentageChange(props.previous, props.current);

  return (
    <Card>
      <CardHeader>
        <CardDescription>Income</CardDescription>
        <CardTitle>{currencyFormatter.format(props.current.toNumber())}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground">
            {currencyFormatter.format(props.previous.toNumber())}
          </span>{" "}
          previous month
          {!props.previous.isZero() && (
            <>
              ,{" "}
              <span
                className={cn({
                  "text-red-500": percentageFromPrevious.lessThan(0),
                  "text-green-500": percentageFromPrevious.greaterThan(0),
                })}
              >
                {percentageFormatter.format(percentageFromPrevious.toNumber())}
              </span>
            </>
          )}
        </p>
      </CardContent>
    </Card>
  );
}

function ExpensesCard(props: { current: Decimal; previous: Decimal }) {
  const percentageFromPrevious = calculatePercentageChange(props.previous, props.current);

  return (
    <Card>
      <CardHeader>
        <CardDescription>Expenses</CardDescription>
        <CardTitle>{currencyFormatter.format(props.current.toNumber())}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground">
            {currencyFormatter.format(props.previous.toNumber())}
          </span>{" "}
          previous month
          {!props.previous.isZero() && (
            <>
              ,{" "}
              <span
                className={cn({
                  "text-red-500": percentageFromPrevious.greaterThan(0),
                  "text-green-500": percentageFromPrevious.lessThan(0),
                })}
              >
                {percentageFormatter.format(percentageFromPrevious.toNumber())}
              </span>
            </>
          )}
        </p>
      </CardContent>
    </Card>
  );
}

function SavingCard(props: {
  currentIncome: Decimal;
  currentSavings: Decimal;
  previousSavings: Decimal;
}) {
  const thisMonthPercentage = props.currentSavings.div(props.currentIncome);
  const percentageChange = calculatePercentageChange(props.previousSavings, props.currentSavings);

  return (
    <Card>
      <CardHeader>
        <CardDescription>Savings</CardDescription>
        <CardTitle className="flex items-center gap-2">
          {currencyFormatter.format(props.currentSavings.toNumber())}
          {!props.currentIncome.isZero() && (
            <Badge
              variant="outline"
              className={cn({
                "border-red-500": thisMonthPercentage.lessThan(0),
                "border-green-500": thisMonthPercentage.greaterThan(0),
              })}
            >
              {percentageFormatter.format(thisMonthPercentage.toNumber())}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground">
            {currencyFormatter.format(props.previousSavings.toNumber())}
          </span>{" "}
          previous month
          {!props.previousSavings.isZero() && (
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
    </Card>
  );
}
