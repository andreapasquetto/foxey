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
import { ItemTitle } from "@/components/ui/item";
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
  const thisMonth = startOfMonth(startOfToday());
  const monthOptions = eachMonthOfInterval({
    start: transactions.at(0)?.datetime ?? startOfYear(thisMonth),
    end: transactions.at(-1)?.datetime ?? endOfYear(thisMonth),
  });
  const [selectedMonth, setSelectedMonth] = useState(
    monthOptions.at(-1) ?? thisMonth,
  );

  return (
    <>
      <div className="flex items-center justify-end">
        <div>
          <Select
            defaultValue={format(selectedMonth, "MM-yyyy")}
            onValueChange={(value) =>
              setSelectedMonth(parse(value, "MM-yyyy", new Date()))
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
      <MonthlyStats transactions={transactions} selectedMonth={selectedMonth} />
      <div className="space-y-3">
        <ItemTitle>Income & Expenses Categories</ItemTitle>
        <MonthlyCategoriesTable
          transactions={transactions}
          selectedMonth={selectedMonth}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="space-y-3">
          <ItemTitle>Trend</ItemTitle>
          <MonthlyTrendChart
            transactions={transactions}
            selectedMonth={selectedMonth}
          />
        </div>
        <div className="space-y-3">
          <ItemTitle>Expenses per day</ItemTitle>
          <MonthlyExpensesPerDayChart
            transactions={transactions}
            selectedMonth={selectedMonth}
          />
        </div>
      </div>
    </>
  );
}
