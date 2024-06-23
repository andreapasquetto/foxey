import { currencyFormatter, numberFormatter, percentageFormatter } from "@/common/formatters";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockedRefuelingStats } from "@/mocks/cars";

interface RefuelingStatsProps {
  carId: string | undefined;
}

export default function RefuelingStats(props: RefuelingStatsProps) {
  if (!props.carId)
    return (
      <div className="my-12">
        <p className="text-center text-sm text-muted-foreground">
          Select a car to see its statistics.
        </p>
      </div>
    );

  const stats = mockedRefuelingStats.find((stat) => stat.carId === props.carId);

  if (!stats)
    return (
      <div className="my-12">
        <p className="text-center text-sm text-muted-foreground">
          Statistics are not available for the selected car.
        </p>
      </div>
    );

  return (
    <div className="grid grid-cols-3 items-start gap-3">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Monthly fuel costs</CardDescription>
          <CardTitle>{currencyFormatter.format(stats.fuelCosts.thisMonth)}</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.fuelCosts.fromLastMonth && (
            <p className="text-xs text-muted-foreground">
              {percentageFormatter.format(stats.fuelCosts.fromLastMonth)} from last month
            </p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Avg. distance before refueling</CardDescription>
          <CardTitle>{numberFormatter.format(stats.distance.average)} km</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.distance.lastYear && stats.distance.total && (
            <div className="text-xs text-muted-foreground">
              {numberFormatter.format(stats.distance.lastYear)} km in the last year,{" "}
              {numberFormatter.format(stats.distance.total)} km in total
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Last fuel economy</CardDescription>
          <CardTitle>{numberFormatter.format(stats.fuelEconomy.last)} km/l</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.fuelEconomy.fromUsual && (
            <div className="text-xs text-muted-foreground">
              {percentageFormatter.format(stats.fuelEconomy.fromUsual)} from usual
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
