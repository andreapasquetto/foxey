"use client";

import {
  eachYearOfInterval,
  endOfYear,
  parse,
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
import { YearlyCategoriesTable } from "@/modules/finance/components/charts/yearly-categories-table";
import { YearlyIncomeExpensesSavingsChart } from "@/modules/finance/components/charts/yearly-income-expenses-savings-chart";
import { YearlyTrendChart } from "@/modules/finance/components/charts/yearly-trend-chart";
import { YearlyStats } from "@/modules/finance/components/yearly-stats";

export function YearSection({ transactions }: { transactions: Transaction[] }) {
  const thisYear = startOfYear(startOfToday());
  const yearOptions = eachYearOfInterval({
    start: transactions.at(0)?.datetime ?? startOfYear(thisYear),
    end: transactions.at(-1)?.datetime ?? endOfYear(thisYear),
  });
  const [selectedYear, setSelectedYear] = useState(
    yearOptions.at(-1) ?? thisYear,
  );

  return (
    <>
      <div className="flex items-center justify-end">
        <div>
          <Select
            defaultValue={selectedYear.getFullYear().toString()}
            onValueChange={(value) =>
              setSelectedYear(parse(value, "yyyy", new Date()))
            }
            disabled={!yearOptions.length}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              {yearOptions.map((y) => (
                <SelectItem
                  key={y.getFullYear()}
                  value={y.getFullYear().toString()}
                >
                  {y.getFullYear()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <YearlyStats transactions={transactions} selectedYear={selectedYear} />
      <div className="space-y-3">
        <ItemTitle>Income & Expenses Categories</ItemTitle>
        <YearlyCategoriesTable
          transactions={transactions}
          selectedYear={selectedYear}
        />
      </div>
      <div className="space-y-3">
        <ItemTitle>Trend</ItemTitle>
        <YearlyTrendChart
          transactions={transactions}
          selectedYear={selectedYear}
        />
      </div>
      <div className="space-y-3">
        <ItemTitle>Income, Expenses & Savings</ItemTitle>
        <YearlyIncomeExpensesSavingsChart
          transactions={transactions}
          selectedYear={selectedYear}
        />
      </div>
    </>
  );
}
