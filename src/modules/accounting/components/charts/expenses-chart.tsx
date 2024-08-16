import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useTransactionCategoriesQuery,
  useTransactionsGetAllQuery,
} from "@/modules/accounting/accounting-queries";
import { generateExpensesChartConfigAndData } from "@/modules/accounting/accounting-utils";
import { DateRange } from "react-day-picker";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

interface ExpensesChartProps {
  walletId?: string;
  dateRange?: DateRange;
}

export function ExpensesChart(props: ExpensesChartProps) {
  const categoriesQuery = useTransactionCategoriesQuery();
  const transactionsQuery = useTransactionsGetAllQuery({
    walletId: props.walletId,
    dateRange: props.dateRange,
  });

  const isFetching = categoriesQuery.isFetching || transactionsQuery.isFetching;
  const categories = categoriesQuery.data ?? [];
  const transactions = transactionsQuery.data ?? [];

  const { chartConfig, chartData } = generateExpensesChartConfigAndData(transactions, categories);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        {isFetching && <Skeleton className="h-[300px] w-full" />}
        {!isFetching && (
          <ChartContainer config={chartConfig}>
            <RadarChart data={chartData}>
              <ChartTooltip content={<ChartTooltipContent className="w-[175px]" hideIndicator />} />
              <PolarAngleAxis dataKey="category" />
              <PolarGrid />
              <Radar
                dataKey="total"
                fill="hsl(var(--foreground))"
                fillOpacity={0.25}
                isAnimationActive={false}
              />
            </RadarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
