import { currencyFormatter } from "@/common/formatters";
import { ChartEmptyStateMessage } from "@/components/empty-state/chart-empty-state-message";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Refueling } from "@/db/types/mobility";
import { format } from "date-fns";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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
    <ChartContainer config={chartConfig}>
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
          content={<ChartTooltipContent className="w-[175px]" hideLabel hideIndicator />}
        />
        <Line
          dataKey="price"
          type="linear"
          stroke="hsl(var(--foreground))"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
