import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useTransactionsGetAllQuery } from "@/modules/accounting/accounting-queries";
import { generateTrendChartData } from "@/modules/accounting/accounting-utils";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

interface TrendChartProps {
  walletId?: string;
  dateRange?: DateRange;
}

export function TrendChart(props: TrendChartProps) {
  const query = useTransactionsGetAllQuery({ walletId: props.walletId });
  const transactions = query.data ?? [];

  const chartData = generateTrendChartData(transactions, {
    walletId: props.walletId,
    dateRange: props.dateRange,
  });
  const chartConfig = {
    amount: {
      label: "Amount",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trend</CardTitle>
      </CardHeader>
      <CardContent>
        {query.isFetching && <Skeleton className="h-[300px] w-full" />}
        {!query.isFetching && (
          <ChartContainer config={chartConfig}>
            <LineChart accessibilityLayer data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="datetime"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => format(value, "MMM dd")}
              />
              <YAxis domain={["auto", "auto"]} />
              <ChartTooltip content={<ChartTooltipContent className="w-[175px]" hideLabel />} />
              <Line
                dataKey="amount"
                type="step"
                stroke="hsl(var(--foreground))"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
