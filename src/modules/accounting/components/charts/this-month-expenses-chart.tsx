"use client";

import { thisMonthToDateRange } from "@/common/dates";
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
  generateThisMonthExpensesChartData,
  generateThisMonthExpensesChartPlaceholderData,
} from "@/modules/accounting/accounting-utils";
import { Bar, BarChart, Brush, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  total: {
    label: "Total",
  },
} satisfies ChartConfig;

export function ThisMonthExpensesChart() {
  const query = useTransactionsGetAllQuery({
    enabled: false,
    dateRange: thisMonthToDateRange(),
  });

  if (query.isFetching || query.isRefetching) {
    return <ComponentSkeleton />;
  }

  if (!query.data) {
    return <ComponentPlaceholder onGenerateChart={() => query.refetch()} />;
  }

  const transactions = query.data;

  if (!transactions.length) {
    return <ComponentEmptyState />;
  }

  const chartData = generateThisMonthExpensesChartData(transactions);

  return (
    <div className="space-y-3">
      <CardTitle>Expenses</CardTitle>
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{ left: 25 }}>
          <CartesianGrid horizontal={false} />
          <XAxis
            type="number"
            dataKey="total"
            tickLine={false}
            axisLine={false}
            domain={[0, "dataMax"]}
            tickFormatter={(tick) => currencyFormatter.format(tick)}
          />
          <YAxis dataKey="category" type="category" tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent className="w-[175px]" hideLabel />} />
          <Brush dataKey="category" height={25} stroke="hsl(0 0% 3.9%)" endIndex={5} />
          <Bar dataKey="total" layout="vertical" fill="hsl(var(--foreground))" radius={2} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

function ComponentSkeleton() {
  return (
    <div className="space-y-3">
      <CardTitle>Expenses</CardTitle>
      <Skeleton className="h-[380px] w-full" />
    </div>
  );
}

function ComponentPlaceholder(props: { onGenerateChart: () => void }) {
  const chartData = generateThisMonthExpensesChartPlaceholderData();

  return (
    <div className="space-y-3">
      <CardTitle>Expenses</CardTitle>

      <div className="relative h-[380px]">
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-neutral-50/95 from-10% to-neutral-50 p-2 dark:from-neutral-950/95 dark:to-neutral-950">
          <Button variant="outline" onClick={props.onGenerateChart}>
            Generate Chart
          </Button>
        </div>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{ left: 25 }}>
            <CartesianGrid horizontal={false} />
            <XAxis
              type="number"
              dataKey="total"
              tickLine={false}
              axisLine={false}
              domain={[0, "dataMax"]}
              tickFormatter={(tick) => currencyFormatter.format(tick)}
            />
            <YAxis dataKey="category" type="category" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent className="w-[175px]" hideLabel />} />
            <Brush dataKey="category" height={25} stroke="hsl(0 0% 3.9%)" endIndex={5} />
            <Bar dataKey="total" layout="vertical" fill="hsl(var(--foreground))" radius={2} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}

function ComponentEmptyState() {
  return (
    <div className="space-y-3">
      <CardTitle>Expenses</CardTitle>
      <div className="relative h-[380px] overflow-hidden rounded-md border border-dashed">
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-neutral-50/95 from-10% to-neutral-50 p-2 dark:from-neutral-950/95 dark:to-neutral-950">
          <p className="text-sm text-muted-foreground">Not enough data.</p>
        </div>
      </div>
    </div>
  );
}
