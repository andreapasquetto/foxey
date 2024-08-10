import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useTransactionsGetAllQuery } from "@/modules/accounting/accounting-queries";
import { WalletSwitcher } from "@/modules/accounting/components/wallet-switcher";
import { WalletRead } from "@/modules/accounting/schemas/wallet-read-schema";
import { format } from "date-fns";
import { Decimal } from "decimal.js";
import { useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

export function TrendChart() {
  const [selectedWallet, setSelectedWallet] = useState<WalletRead | undefined>(undefined);
  const query = useTransactionsGetAllQuery(selectedWallet?.id);

  const transactions = query.data ?? [];

  const chartData = transactions
    .reduce<
      Array<{
        date: Date;
        amount: Decimal;
      }>
    >((acc, tx) => {
      let amountChange = new Decimal(0);

      const isTransfer = tx.fromWalletId && tx.toWalletId;
      if (isTransfer) {
        if (tx.fromWalletId === selectedWallet?.id) amountChange = amountChange.sub(tx.amount);
        if (tx.toWalletId === selectedWallet?.id) amountChange = amountChange.add(tx.amount);
      } else {
        if (tx.fromWalletId) amountChange = amountChange.sub(tx.amount);
        if (tx.toWalletId) amountChange = amountChange.add(tx.amount);
      }

      acc.push({
        date: tx.date,
        amount: acc.length ? acc[acc.length - 1].amount.add(amountChange) : amountChange,
      });

      return acc;
    }, [])
    .map((item) => ({ date: item.date, amount: item.amount.toNumber() }));

  const chartConfig = {
    amount: {
      label: "Amount",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col justify-center gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Trend</CardTitle>
          <WalletSwitcher selectedWallet={selectedWallet} onSelectWallet={setSelectedWallet} />
        </div>
      </CardHeader>
      <CardContent>
        {query.isFetching && <Skeleton className="h-[500px] w-full" />}
        {!query.isFetching && (
          <ChartContainer config={chartConfig}>
            <LineChart accessibilityLayer data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => format(value, "dd MMM yyyy")}
              />
              <YAxis domain={["auto", "auto"]} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent className="w-[175px]" hideLabel />}
              />
              <Line
                dataKey="amount"
                type="step"
                stroke="hsl(var(--foreground))"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
