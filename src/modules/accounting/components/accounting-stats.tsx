import { currencyFormatter, percentageFormatter } from "@/common/formatters";
import { calculatePercentageChange } from "@/common/math";
import { CircularSpinner } from "@/components/circular-spinner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useTransactionCategoriesQuery,
  useTransactionsGetLastMonthQuery,
  useTransactionsGetMonthToDateQuery,
} from "@/modules/accounting/accounting-queries";
import {
  getIncomingTransactions,
  getOutgoingTransactions,
  calculateTransactionsAmount,
  getTransactionsWithoutTransfers,
} from "@/modules/accounting/accounting-utils";

export default function AccountingStats() {
  const categoriesQuery = useTransactionCategoriesQuery();
  const transactionsMonthToDateQuery = useTransactionsGetMonthToDateQuery();
  const transactionsLastMonthQuery = useTransactionsGetLastMonthQuery();

  if (
    !categoriesQuery.data ||
    categoriesQuery.isFetching ||
    !transactionsMonthToDateQuery.data ||
    transactionsMonthToDateQuery.isFetching ||
    !transactionsLastMonthQuery.data ||
    transactionsLastMonthQuery.isFetching
  ) {
    return <CircularSpinner className="mx-auto" />;
  }

  const transactionsWithoutTransfers = {
    thisMonth: getTransactionsWithoutTransfers(transactionsMonthToDateQuery.data),
    lastMonth: getTransactionsWithoutTransfers(transactionsLastMonthQuery.data),
  };

  const transactions = {
    thisMonth: {
      incoming: getIncomingTransactions(transactionsWithoutTransfers.thisMonth),
      outgoing: getOutgoingTransactions(transactionsWithoutTransfers.thisMonth),
    },
    lastMonth: {
      incoming: getIncomingTransactions(transactionsWithoutTransfers.lastMonth),
      outgoing: getOutgoingTransactions(transactionsWithoutTransfers.lastMonth),
    },
  };

  const totalAmounts = {
    thisMonth: {
      incoming: calculateTransactionsAmount(transactions.thisMonth.incoming),
      outgoing: calculateTransactionsAmount(transactions.thisMonth.outgoing),
    },
    lastMonth: {
      incoming: calculateTransactionsAmount(transactions.lastMonth.incoming),
      outgoing: calculateTransactionsAmount(transactions.lastMonth.outgoing),
    },
  };

  const savings = {
    thisMonth: totalAmounts.thisMonth.incoming.sub(totalAmounts.thisMonth.outgoing),
    lastMonth: totalAmounts.lastMonth.incoming.sub(totalAmounts.lastMonth.outgoing),
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stats</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Income this month</CardDescription>
              <CardTitle className="flex items-center gap-2">
                {currencyFormatter.format(totalAmounts.thisMonth.incoming.toNumber())}
                <Badge variant="outline">
                  {percentageFormatter.format(
                    calculatePercentageChange(
                      totalAmounts.lastMonth.incoming,
                      totalAmounts.thisMonth.incoming,
                    ).toNumber(),
                  )}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {currencyFormatter.format(totalAmounts.lastMonth.incoming.toNumber())} last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Expenses this month</CardDescription>
              <CardTitle className="flex items-center gap-2">
                {currencyFormatter.format(totalAmounts.thisMonth.outgoing.toNumber())}
                <Badge variant="outline">
                  {percentageFormatter.format(
                    calculatePercentageChange(
                      totalAmounts.lastMonth.outgoing,
                      totalAmounts.thisMonth.outgoing,
                    ).toNumber(),
                  )}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {currencyFormatter.format(totalAmounts.lastMonth.outgoing.toNumber())} last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Saved</CardDescription>
              <CardTitle className="flex items-center gap-2">
                {currencyFormatter.format(savings.thisMonth.toNumber())}
                <Badge variant="outline">
                  {percentageFormatter.format(
                    calculatePercentageChange(savings.lastMonth, savings.thisMonth).toNumber(),
                  )}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {currencyFormatter.format(savings.lastMonth.toNumber())} last month
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
