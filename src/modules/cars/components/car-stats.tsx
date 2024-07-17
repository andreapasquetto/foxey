import { currencyFormatter, numberFormatter, percentageFormatter } from "@/common/formatters";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface RefuelingStatsProps {
  carId: string | undefined;
}

export default function CarStats(props: RefuelingStatsProps) {
  if (!props.carId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-muted-foreground">
            Select a car to see its statistics.
          </p>
        </CardContent>
      </Card>
    );
  }

  // TODO: calculate stats from all refuelings
  const stats = {
    fuelCosts: {
      thisMonth: 0,
      fromLastMonth: null,
    },
    distance: {
      average: 0,
      lastYear: null,
      total: null,
    },
    fuelEconomy: {
      last: 0,
      fromUsual: null,
    },
  };

  if (!true) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-muted-foreground">
            Statistics are not available for the selected car.
          </p>
        </CardContent>
      </Card>
    );
  }

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
