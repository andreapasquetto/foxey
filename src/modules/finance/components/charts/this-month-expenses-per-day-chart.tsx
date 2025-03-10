"use client";

import { currencyFormatter } from "@/common/formatters";
import { thisMonthToDateRange } from "@/common/utils/dates";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useTransactionsGetAllQuery } from "@/modules/finance/finance-queries";
import {
  generateThisMonthExpensesPerDayChartData,
  generateThisMonthExpensesPerDayPlaceholderData,
} from "@/modules/finance/finance-utils";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  amont: {
    label: "Amount",
  },
} satisfies ChartConfig;

export function ThisMonthExpensesPerDayChart() {
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
    return <NotEnoughDataSkeleton />;
  }

  const chartData = generateThisMonthExpensesPerDayChartData(transactions);

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

function ComponentSkeleton() {
  return (
    <div className="space-y-3">
      <CardTitle>Expenses per day</CardTitle>
      <Skeleton className="h-[380px] w-full" />
    </div>
  );
}

function ComponentPlaceholder(props: { onGenerateChart: () => void }) {
  const chartData = generateThisMonthExpensesPerDayPlaceholderData();

  return (
    <div className="space-y-3">
      <CardTitle>Expenses per day</CardTitle>
      <div className="relative h-[380px]">
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-neutral-50/95 from-10% to-neutral-50 p-2 dark:from-neutral-950/95 dark:to-neutral-950">
          <Button variant="outline" onClick={props.onGenerateChart}>
            Generate Chart
          </Button>
        </div>
        <ChartContainer config={chartConfig} className="aspect-auto h-[380px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} domain={[0, "dataMax"]} />
            <ChartTooltip content={<ChartTooltipContent className="w-[175px]" />} />
            <Bar dataKey="amount" fill="hsl(var(--foreground))" radius={2} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}

function NotEnoughDataSkeleton() {
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
