"use client";

import {
  eachMonthOfInterval,
  endOfYear,
  format,
  parse,
  startOfMonth,
  startOfToday,
  startOfYear,
} from "date-fns";
import { useState } from "react";
import { CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Transaction } from "@/db/types/finance";
import { MonthlyCategoriesTable } from "@/modules/finance/components/charts/monthly-categories-table";
import { MonthlyExpensesPerDayChart } from "@/modules/finance/components/charts/monthly-expenses-per-day-chart";
import { MonthlyTrendChart } from "@/modules/finance/components/charts/monthly-trend-chart";
import { MonthlyStats } from "@/modules/finance/components/monthly-stats";

export function MonthSection({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const [month, setMonth] = useState(startOfMonth(startOfToday()));
  const monthOptions = eachMonthOfInterval({
    start: transactions.at(0)?.datetime ?? startOfYear(month),
    end: transactions.at(-1)?.datetime ?? endOfYear(month),
  });

  return (
    <>
      <div className="flex items-center justify-end">
        <div>
          <Select
            defaultValue={format(month, "MM-yyyy")}
            onValueChange={(value) =>
              setMonth(parse(value, "MM-yyyy", new Date()))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              {monthOptions.map((m) => (
                <SelectItem
                  key={format(m, "MM-yyyy")}
                  value={format(m, "MM-yyyy")}
                >
                  {format(m, "MMMM yyyy")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <MonthlyStats transactions={transactions} selectedMonth={month} />
      <div className="space-y-3">
        <CardTitle>Income & Expenses Categories</CardTitle>
        <MonthlyCategoriesTable
          transactions={transactions}
          selectedMonth={month}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="space-y-3">
          <CardTitle>Trend</CardTitle>
          <MonthlyTrendChart
            transactions={transactions}
            selectedMonth={month}
          />
        </div>
        <div className="space-y-3">
          <CardTitle>Expenses per day</CardTitle>
          <MonthlyExpensesPerDayChart
            transactions={transactions}
            selectedMonth={month}
          />
        </div>
      </div>
    </>
  );
}
