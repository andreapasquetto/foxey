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
import { generateMonthTrendChartData } from "@/modules/finance/finance-utils";
import { format } from "date-fns";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const chartConfig = {
  amount: {
    label: "Amount",
  },
} satisfies ChartConfig;

export function MonthlyTrendChart({
  transactions,
  selectedMonth,
}: {
  transactions: Transaction[];
  selectedMonth: Date;
}) {
  const chartData = generateMonthTrendChartData({ transactions, month: selectedMonth });

  if (chartData.length < 2) {
    return <ChartEmptyStateMessage />;
  }

  return (
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
        <Line dataKey="amount" type="step" stroke="var(--foreground)" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  );
}
