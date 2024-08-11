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

  const chartData = generateTrendChartData(transactions, { dateRange: props.dateRange });
  const chartConfig = {
    amount: {
      label: "Amount",
    },
  } satisfies ChartConfig;

  return (
    <div>
      {query.isFetching && <Skeleton className="h-[300px] w-full md:h-[500px]" />}
      {!query.isFetching && (
        <ChartContainer config={chartConfig}>
          <LineChart accessibilityLayer data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => format(value, "dd MMM yyyy")}
            />
            <YAxis domain={["auto", "auto"]} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="w-[175px]" hideLabel />}
            />
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
    </div>
  );
}
