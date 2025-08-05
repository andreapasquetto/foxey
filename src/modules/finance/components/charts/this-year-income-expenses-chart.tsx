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
import { generateThisYearIncomeExpensesChartData } from "@/modules/finance/finance-utils";
import { isSameYear, startOfToday } from "date-fns";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  income: {
    label: "Income",
  },
  expenses: {
    label: "Expenses",
  },
} satisfies ChartConfig;

export function ThisYearIncomeExpensesChart(props: { transactions: Transaction[] }) {
  const { transactions } = props;

  if (!transactions.length) {
    return <ChartEmptyStateMessage />;
  }

  const chartData = generateThisYearIncomeExpensesChartData(
    transactions.filter((tx) => isSameYear(startOfToday(), tx.datetime)),
  );

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
        <Bar dataKey="income" fill="hsl(var(--foreground))" radius={2} />
        <Bar dataKey="expenses" fill="hsl(var(--chart-accent-1))" radius={2} />
      </BarChart>
    </ChartContainer>
  );
}
