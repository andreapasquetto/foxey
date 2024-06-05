import { currencyFormatter, percentageFormatter } from "@/common/formatters";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { mockedStats } from "@/mocks/accounting";

export default function AccountingStats() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 items-start gap-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Monthly income</CardDescription>
            <CardTitle>{currencyFormatter.format(mockedStats.income.totalMonthly)}</CardTitle>
          </CardHeader>
          <CardContent>
            {mockedStats.income.fromPreviousMonth && (
              <p className="text-xs text-muted-foreground">
                {percentageFormatter.format(mockedStats.income.fromPreviousMonth)} from last month
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Monthly expenses</CardDescription>
            <CardTitle>{currencyFormatter.format(mockedStats.expenses.totalMonthly)}</CardTitle>
          </CardHeader>
          <CardContent>
            {mockedStats.expenses.fromPreviousMonth && (
              <p className="text-xs text-muted-foreground">
                {percentageFormatter.format(mockedStats.expenses.fromPreviousMonth)} from last month
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Profit</CardDescription>
            <CardTitle>
              {currencyFormatter.format(mockedStats.profit.totalMonthly)}
              {mockedStats.profit.percentage && (
                <span
                  className={cn(
                    "ml-1 text-sm font-normal",
                    mockedStats.profit.percentage > 0
                      ? "text-green-500 dark:text-green-400"
                      : "text-red-500 dark:text-red-400",
                  )}
                >
                  {percentageFormatter.format(mockedStats.profit.percentage)}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mockedStats.profit.fromPreviousMonth && (
              <p className="text-xs text-muted-foreground">
                {percentageFormatter.format(mockedStats.profit.fromPreviousMonth)} from last month
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
