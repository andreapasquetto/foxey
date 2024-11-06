"use client";

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
  generateThisMonthTrendChartData,
  generateThisMonthTrendChartPlaceholderData,
} from "@/modules/accounting/accounting-utils";
import { format } from "date-fns";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const chartConfig = {
  amount: {
    label: "Amount",
  },
} satisfies ChartConfig;

export function ThisMonthTrendChart() {
  const query = useTransactionsGetAllQuery({ enabled: false });

  if (query.isFetching || query.isRefetching) {
    return (
      <div className="space-y-3">
        <CardTitle>Trend</CardTitle>
        <Skeleton className="h-[380px] w-full" />
      </div>
    );
  }

  if (!query.data) return <GenerateChartSkeleton onGenerateChart={() => query.refetch()} />;

  const transactions = query.data;

  if (!transactions.length) return <NotEnoughDataSkeleton />;

  const chartData = generateThisMonthTrendChartData(transactions);

  return (
    <div className="space-y-3">
      <CardTitle>Trend</CardTitle>
      <ChartContainer config={chartConfig}>
        <LineChart accessibilityLayer data={chartData} margin={{ left: 25 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="datetime"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => format(value, "MMM dd")}
          />
          <YAxis
            domain={["auto", "dataMax"]}
            tickLine={false}
            axisLine={false}
            tickFormatter={(tick) => currencyFormatter.format(tick)}
          />
          <ChartTooltip content={<ChartTooltipContent className="w-[175px]" hideLabel />} />
          <Line
            dataKey="amount"
            type="step"
            stroke="hsl(var(--foreground))"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

function GenerateChartSkeleton(props: { onGenerateChart: () => void }) {
  const chartData = generateThisMonthTrendChartPlaceholderData();

  return (
    <div className="space-y-3">
      <CardTitle>Trend</CardTitle>
      <div className="relative h-[380px]">
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-neutral-950/95 from-10% to-neutral-950 p-2">
          <Button variant="outline" onClick={props.onGenerateChart}>
            Generate Chart
          </Button>
        </div>
        <ChartContainer config={chartConfig} className="aspect-auto h-[380px] w-full">
          <LineChart accessibilityLayer data={chartData} margin={{ left: 25 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="datetime"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => format(value, "MMM dd")}
            />
            <YAxis
              domain={["auto", "dataMax"]}
              tickLine={false}
              axisLine={false}
              tickFormatter={(tick) => currencyFormatter.format(tick)}
            />
            <ChartTooltip content={<ChartTooltipContent className="w-[175px]" hideLabel />} />
            <Line
              dataKey="amount"
              type="step"
              stroke="hsl(var(--foreground))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
}

function NotEnoughDataSkeleton() {
  return (
    <div className="space-y-3">
      <CardTitle>Trend</CardTitle>
      <div className="relative h-[380px] overflow-hidden rounded-md border border-dashed">
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-neutral-950/95 from-10% to-neutral-950 p-2">
          <p className="text-sm text-muted-foreground">Not enough data.</p>
        </div>
      </div>
    </div>
  );
}
