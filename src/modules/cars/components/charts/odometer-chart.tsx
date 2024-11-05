import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { RefuelingRead } from "@/modules/cars/schemas/refueling-read-schema";
import { format } from "date-fns";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

interface OdometerChartProps {
  refuelings: RefuelingRead[];
}

export function OdometerChart(props: OdometerChartProps) {
  const chartConfig = {
    odometer: {
      label: "Odometer",
    },
  } satisfies ChartConfig;

  const chartData = props.refuelings.map((refueling) => ({
    datetime: refueling.datetime,
    odometer: Number(refueling.odometer),
  }));

  return (
    <div className="space-y-3">
      <CardTitle>Odometer</CardTitle>
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
            content={<ChartTooltipContent className="w-[175px]" hideLabel />}
          />
          <Line
            dataKey="odometer"
            type="linear"
            stroke="hsl(var(--foreground))"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
