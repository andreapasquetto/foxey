import { CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { generateOdometerChartData } from "@/modules/mobility/mobility-utils";
import { InspectionRead } from "@/modules/mobility/schemas/inspection-read-schema";
import { RefuelingRead } from "@/modules/mobility/schemas/refueling-read-schema";
import { ServiceRead } from "@/modules/mobility/schemas/service-read-schema";
import { format } from "date-fns";
import { CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts";

const chartConfig = {
  refueling: {
    label: "Refueling",
  },
  service: {
    label: "Service",
  },
  inspection: {
    label: "Inspection",
  },
} satisfies ChartConfig;

interface OdometerChartProps {
  refuelings: RefuelingRead[];
  services: ServiceRead[];
  inspections: InspectionRead[];
}

export function OdometerChart(props: OdometerChartProps) {
  // TODO: show less data filtering by year
  const chartData = generateOdometerChartData({
    refuelings: props.refuelings,
    services: props.services,
    inspections: props.inspections,
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
            dot={{ fill: "hsl(var(--chart-accent-1))" }}
            activeDot={{ fill: "hsl(var(--chart-accent-1))", r: 4 }}
          />
          <Line
            dataKey="inspection"
            type="linear"
            stroke="none"
            dot={{ fill: "hsl(var(--chart-accent-2))" }}
            activeDot={{ fill: "hsl(var(--chart-accent-2))", r: 4 }}
          />
        </ComposedChart>
      </ChartContainer>
    </div>
  );
}
