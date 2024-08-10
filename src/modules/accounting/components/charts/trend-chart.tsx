import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useTransactionsGetAllQuery } from "@/modules/accounting/accounting-queries";
import { format, isWithinInterval } from "date-fns";
import { Decimal } from "decimal.js";
import { DateRange } from "react-day-picker";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

interface TrendChartProps {
  walletId?: string;
  dateRange?: DateRange;
}

export function TrendChart(props: TrendChartProps) {
  const query = useTransactionsGetAllQuery(props.walletId);

  const transactions = query.data ?? [];

  const chartData = transactions
    .reduce<
      Array<{
        date: Date;
        amount: Decimal;
      }>
    >((acc, tx) => {
      let amountChange = new Decimal(0);

      const isTransfer = tx.fromWalletId && tx.toWalletId;
      if (isTransfer) {
        if (tx.fromWalletId === props.walletId) amountChange = amountChange.sub(tx.amount);
        if (tx.toWalletId === props.walletId) amountChange = amountChange.add(tx.amount);
      } else {
        if (tx.fromWalletId) amountChange = amountChange.sub(tx.amount);
        if (tx.toWalletId) amountChange = amountChange.add(tx.amount);
      }

      acc.push({
        date: tx.date,
        amount: acc.length ? acc[acc.length - 1].amount.add(amountChange) : amountChange,
      });

      return acc;
    }, [])
    .filter((tx) =>
      props.dateRange
        ? isWithinInterval(tx.date, { start: props.dateRange.from!, end: props.dateRange.to! })
        : true,
    )
    .map((item) => ({ date: item.date, amount: item.amount.toNumber() }));

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
