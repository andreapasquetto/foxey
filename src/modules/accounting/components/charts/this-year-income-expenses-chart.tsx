"use client";

import { thisYearToDateRange } from "@/common/dates";
import { currencyFormatter } from "@/common/formatters";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useTransactionsGetAllQuery } from "@/modules/accounting/accounting-queries";
import {
  generateThisYearIncomeExpensesChartData,
  generateThisYearIncomeExpensesChartPlaceholderData,
} from "@/modules/accounting/accounting-utils";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  income: {
    label: "Income",
  },
  expenses: {
    label: "Expenses",
  },
} satisfies ChartConfig;

export function ThisYearIncomeExpensesChart() {
  const query = useTransactionsGetAllQuery({
    enabled: false,
    dateRange: thisYearToDateRange(),
  });

  if (query.isFetching || query.isRefetching) {
    return (
      <div className="space-y-3">
        <CardTitle>Income VS Expenses</CardTitle>
        <Skeleton className="h-[350px] w-full" />
      </div>
    );
  }

  if (!query.data) return <GenerateChartSkeleton onGenerateChart={() => query.refetch()} />;

  const transactions = query.data;

  if (!transactions.length) return <NotEnoughDataSkeleton />;

  const chartData = generateThisYearIncomeExpensesChartData(transactions);

  return (
    <div className="space-y-3">
      <CardTitle>Income VS Expenses</CardTitle>
      <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
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
          <Bar dataKey="expenses" fill="hsl(var(--chart-accent))" radius={2} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

function GenerateChartSkeleton(props: { onGenerateChart: () => void }) {
  const chartData = generateThisYearIncomeExpensesChartPlaceholderData();

  return (
    <div className="space-y-3">
      <CardTitle>Income VS Expenses</CardTitle>
      <div className="relative h-[350px]">
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-neutral-50/95 from-10% to-neutral-50 p-2 dark:from-neutral-950/95 dark:to-neutral-950">
          <Button variant="outline" onClick={props.onGenerateChart}>
            Generate Chart
          </Button>
        </div>
        <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} domain={[0, "dataMax"]} />
            <ChartTooltip content={<ChartTooltipContent className="w-[175px]" />} />
            <Bar dataKey="income" fill="hsl(var(--foreground))" radius={2} />
            <Bar dataKey="expenses" fill="hsl(var(--chart-accent))" radius={2} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}

function NotEnoughDataSkeleton() {
  return (
    <div className="space-y-3">
      <CardTitle>Income VS Expenses</CardTitle>
      <div className="relative h-[350px] overflow-hidden rounded-md border border-dashed">
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-neutral-50/95 from-10% to-neutral-50 p-2 dark:from-neutral-950/95 dark:to-neutral-950">
          <p className="text-sm text-muted-foreground">Not enough data.</p>
        </div>
      </div>
    </div>
  );
}
