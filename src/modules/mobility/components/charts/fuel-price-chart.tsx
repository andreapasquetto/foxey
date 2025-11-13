import { format } from "date-fns";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { currencyFormatter } from "@/common/formatters";
import { ChartEmptyStateMessage } from "@/components/empty-state/chart-empty-state-message";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { Refueling } from "@/db/types/mobility";

const chartConfig = {
  price: {
    label: "Price",
  },
} satisfies ChartConfig;

export function FuelPriceChart(props: { refuelings: Refueling[] }) {
  if (!props.refuelings.length) {
    return <ChartEmptyStateMessage />;
  }

  const chartData = props.refuelings.map((refueling) => ({
    datetime: refueling.transaction.datetime,
    price: refueling.price,
  }));

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[350px] w-full"
    >
      <LineChart accessibilityLayer data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="datetime"
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => format(value, "MMM y")}
        />
        <YAxis
          domain={["auto", "auto"]}
          tickFormatter={(value) => currencyFormatter.format(Number(value))}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              className="w-[175px]"
              hideLabel
              hideIndicator
            />
          }
        />
        <Line
          dataKey="price"
          type="linear"
          stroke="var(--foreground)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
