import { currencyFormatter } from "@/common/formatters";
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

export function FuelPriceChart(props: { refuelings: Refueling[] }) {
  if (!props.refuelings.length) {
    return <ComponentEmptyState />;
  }

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
    </div>
  );
}

function ComponentEmptyState() {
  return (
    <div className="space-y-3">
      <CardTitle>Fuel price</CardTitle>
      <div className="relative h-[380px] overflow-hidden rounded-md border border-dashed">
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-neutral-50/95 from-10% to-neutral-50 p-2 dark:from-neutral-950/95 dark:to-neutral-950">
          <p className="text-sm text-muted-foreground">Not enough data.</p>
        </div>
      </div>
    </div>
  );
}
