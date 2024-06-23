import { currencyFormatter, percentageFormatter } from "@/common/formatters";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { mockedStats } from "@/mocks/accounting";

interface AccountingStatsProps {
  walletId: string | undefined;
}

export default function AccountingStats(props: AccountingStatsProps) {
  if (!props.walletId) {
    return (
      <div className="my-12">
        <p className="text-center text-sm text-muted-foreground">
          Select a wallet to see its statistics.
        </p>
      </div>
    );
  }

  const filteredStats = mockedStats.find((stat) => stat.walletId === props.walletId);

  if (!filteredStats) {
    return (
      <div className="my-12">
        <p className="text-center text-sm text-muted-foreground">
          Statistics are not available for the selected wallet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 items-start gap-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Monthly income</CardDescription>
            <CardTitle>
              {currencyFormatter.format(filteredStats.stats.income.totalMonthly)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredStats.stats.income.fromPreviousMonth && (
              <p className="text-xs text-muted-foreground">
                {percentageFormatter.format(filteredStats.stats.income.fromPreviousMonth)} from last
                month
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Monthly expenses</CardDescription>
            <CardTitle>
              {currencyFormatter.format(filteredStats.stats.expenses.totalMonthly)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredStats.stats.expenses.fromPreviousMonth && (
              <p className="text-xs text-muted-foreground">
                {percentageFormatter.format(filteredStats.stats.expenses.fromPreviousMonth)} from
                last month
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Profit</CardDescription>
            <CardTitle>
              {currencyFormatter.format(filteredStats.stats.profit.totalMonthly)}
              {filteredStats.stats.profit.percentage && (
                <span
                  className={cn(
                    "ml-1 text-sm font-normal",
                    filteredStats.stats.profit.percentage > 0
                      ? "text-green-500 dark:text-green-400"
                      : "text-red-500 dark:text-red-400",
                  )}
                >
                  {percentageFormatter.format(filteredStats.stats.profit.percentage)}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredStats.stats.profit.fromPreviousMonth && (
              <p className="text-xs text-muted-foreground">
                {percentageFormatter.format(filteredStats.stats.profit.fromPreviousMonth)} from last
                month
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
