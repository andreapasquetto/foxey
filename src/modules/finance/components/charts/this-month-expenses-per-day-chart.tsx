"use client";

import { currencyFormatter } from "@/common/formatters";
import { CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Transaction } from "@/db/types/finance";
import { generateThisMonthExpensesPerDayChartData } from "@/modules/finance/finance-utils";
import { isSameMonth, startOfToday } from "date-fns";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  amont: {
    label: "Amount",
  },
} satisfies ChartConfig;

export function ThisMonthExpensesPerDayChart(props: { transactions: Transaction[] }) {
  const { transactions } = props;
  const filteredTransactions = transactions.filter((tx) =>
    isSameMonth(startOfToday(), tx.datetime),
  );

  if (!transactions.length || !filteredTransactions.length) {
    return <ComponentEmptyState />;
  }

  const chartData = generateThisMonthExpensesPerDayChartData(filteredTransactions);

  return (
    <div className="space-y-3">
      <CardTitle>Expenses per day</CardTitle>
      <ChartContainer config={chartConfig} className="aspect-auto h-[380px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="day" tickLine={false} axisLine={false} />
          <YAxis
            tickLine={false}
            axisLine={false}
            domain={[0, "dataMax"]}
            tickFormatter={(value) => currencyFormatter.format(value)}
          />
          <ChartTooltip content={<ChartTooltipContent className="w-[175px]" />} />
          <Bar dataKey="amount" fill="hsl(var(--foreground))" radius={2} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

function ComponentEmptyState() {
  return (
    <div className="space-y-3">
      <CardTitle>Expenses per day</CardTitle>
      <div className="relative h-[380px] overflow-hidden rounded-md border border-dashed">
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-neutral-50/95 from-10% to-neutral-50 p-2 dark:from-neutral-950/95 dark:to-neutral-950">
          <p className="text-sm text-muted-foreground">Not enough data.</p>
        </div>
      </div>
    </div>
  );
}
