import { currencyFormatter, percentageFormatter } from "@/common/formatters";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AccountingStatsProps {
  walletId: string | undefined;
}

export default function AccountingStats(props: AccountingStatsProps) {
  if (!props.walletId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-muted-foreground">
            Select a wallet to see its statistics.
          </p>
        </CardContent>
      </Card>
    );
  }

  // TODO: calculate stats from all transactions or get directly from wallet
  const stats = {
    income: {
      thisMonth: 2000,
      percentageFromLastMonth: 0.1,
    },
    expenses: {
      thisMonth: 500,
      percentageFromLastMonth: -0.1,
    },
    profit: {
      thisMonth: 1500,
      percentageFromLastMonth: 0.25,
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
            Statistics are not available for the selected wallet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stats</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-3 items-start gap-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Monthly income</CardDescription>
              <CardTitle>{currencyFormatter.format(stats.income.thisMonth)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {percentageFormatter.format(stats.income.percentageFromLastMonth)} from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Monthly expenses</CardDescription>
              <CardTitle>{currencyFormatter.format(stats.expenses.thisMonth)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {percentageFormatter.format(stats.expenses.percentageFromLastMonth)} from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Profit</CardDescription>
              <CardTitle>
                {currencyFormatter.format(stats.profit.thisMonth)}
                <span
                  className={cn(
                    "ml-1 text-sm font-normal",
                    0.75 > 0
                      ? "text-green-500 dark:text-green-400"
                      : "text-red-500 dark:text-red-400",
                  )}
                >
                  {percentageFormatter.format(stats.profit.percentageFromLastMonth)}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {percentageFormatter.format(0.25)} from last month
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
