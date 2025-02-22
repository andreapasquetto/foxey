import { CardTitle } from "@/components/ui/card";
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

interface FuelPriceChartProps {
  refuelings: Refueling[];
}

export function FuelPriceChart(props: FuelPriceChartProps) {
  const chartData = props.refuelings.map((refueling) => ({
    datetime: refueling.transaction.datetime,
    price: refueling.price,
  }));

  return (
    <div className="space-y-3">
      <CardTitle>Fuel price</CardTitle>
      <ChartContainer config={chartConfig}>
        <LineChart accessibilityLayer data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="datetime"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => format(value, "MMM y")}
          />
          <YAxis domain={["auto", "auto"]} />
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
    </div>
  );
}
