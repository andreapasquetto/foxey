"use client";

import { isSameMonth } from "date-fns";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { currencyFormatter } from "@/common/formatters";
import { ChartEmptyStateMessage } from "@/components/empty-state/chart-empty-state-message";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { Transaction } from "@/db/types/finance";
import { generateMonthExpensesPerDayChartData } from "@/modules/finance/utils";

const chartConfig = {
  amont: {
    label: "Amount",
  },
} satisfies ChartConfig;

export function MonthlyExpensesPerDayChart({
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

  const chartData = generateMonthExpensesPerDayChartData({
    transactions: filteredTransactions,
    month: selectedMonth,
  });

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[380px] w-full"
    >
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
        <Bar dataKey="amount" fill="var(--foreground)" radius={2} />
      </BarChart>
    </ChartContainer>
  );
}
