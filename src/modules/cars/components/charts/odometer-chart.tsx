import { CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { generateOdometerChartData } from "@/modules/cars/cars-utils";
import { RefuelingRead } from "@/modules/cars/schemas/refueling-read-schema";
import { ServiceRead } from "@/modules/cars/schemas/service-read-schema";
import { format } from "date-fns";
import { CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts";

const chartConfig = {
  refueling: {
    label: "Refueling",
  },
  service: {
    label: "Service",
  },
} satisfies ChartConfig;

interface OdometerChartProps {
  refuelings: RefuelingRead[];
  services: ServiceRead[];
}

export function OdometerChart(props: OdometerChartProps) {
  // TODO: show less data filtering by year
  const chartData = generateOdometerChartData({
    refuelings: props.refuelings,
    services: props.services,
  });

  return (
    <div className="space-y-3">
      <CardTitle>Odometer</CardTitle>
      <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
        <ComposedChart accessibilityLayer data={chartData}>
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
            dataKey="refueling"
            type="linear"
            stroke="hsl(var(--foreground))"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="service"
            type="linear"
            stroke="none"
            dot={{ fill: "hsl(var(--chart-accent))" }}
            activeDot={{ fill: "hsl(var(--chart-accent))", r: 4 }}
          />
        </ComposedChart>
      </ChartContainer>
    </div>
  );
}
