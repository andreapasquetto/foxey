"use client";

import { currencyFormatter } from "@/common/formatters";
import { ChartEmptyStateMessage } from "@/components/empty-state/chart-empty-state-message";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Transaction } from "@/db/types/finance";
import { generateYearIncomeExpensesSavingsChartData } from "@/modules/finance/finance-utils";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  income: {
    label: "Income",
  },
  expenses: {
    label: "Expenses",
  },
  savings: {
    label: "Savings",
  },
} satisfies ChartConfig;

export function YearlyIncomeExpensesSavingsChart({
  transactions,
  selectedYear,
}: {
  transactions: Transaction[];
  selectedYear: Date;
}) {
  if (!transactions.length) {
    return <ChartEmptyStateMessage />;
  }

  const chartData = generateYearIncomeExpensesSavingsChartData({
    transactions,
    year: selectedYear,
  });

  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-[380px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis
          tickLine={false}
          axisLine={false}
          domain={[0, "dataMax"]}
          tickFormatter={(value) => currencyFormatter.format(value)}
        />
        <ChartTooltip content={<ChartTooltipContent className="w-[175px]" />} />
        <Bar dataKey="income" fill="var(--chart-2)" radius={2} />
        <Bar dataKey="expenses" fill="var(--chart-5)" radius={2} />
        <Bar dataKey="savings" fill="var(--chart-3)" radius={2} />
      </BarChart>
    </ChartContainer>
  );
}
