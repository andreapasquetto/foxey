"use client";

import { Heading2 } from "@/components/typography";
import { CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Transaction } from "@/db/types/finance";
import { YearlyCategoriesTable } from "@/modules/finance/components/charts/yearly-categories-table";
import { YearlyIncomeExpensesSavingsChart } from "@/modules/finance/components/charts/yearly-income-expenses-savings-chart";
import { YearlyTrendChart } from "@/modules/finance/components/charts/yearly-trend-chart";
import { YearlyStats } from "@/modules/finance/components/yearly-stats";
import { eachYearOfInterval, parse, startOfToday, startOfYear } from "date-fns";
import { useState } from "react";

export function YearSection({ transactions }: { transactions: Transaction[] }) {
  const [year, setYear] = useState(startOfYear(startOfToday()));
  const yearOptions = eachYearOfInterval({
    start: transactions.at(0)!.datetime,
    end: transactions.at(-1)!.datetime,
  });

  return (
    <section className="space-y-6">
      <Heading2>By year</Heading2>
      <div className="flex items-center justify-end">
        <div>
          <Select
            defaultValue={year.getFullYear().toString()}
            onValueChange={(value) => setYear(parse(value, "yyyy", new Date()))}
            disabled={!yearOptions.length}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              {yearOptions.map((y) => (
                <SelectItem key={y.getFullYear()} value={y.getFullYear().toString()}>
                  {y.getFullYear()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <YearlyStats transactions={transactions} selectedYear={year} />
      <div className="space-y-3">
        <CardTitle>Income & Expenses</CardTitle>
        <YearlyCategoriesTable transactions={transactions} selectedYear={year} />
      </div>
      <div className="space-y-3">
        <CardTitle>Trend</CardTitle>
        <YearlyTrendChart transactions={transactions} selectedYear={year} />
      </div>
      <div className="space-y-3">
        <CardTitle>Income VS Expenses</CardTitle>
        <YearlyIncomeExpensesSavingsChart transactions={transactions} selectedYear={year} />
      </div>
    </section>
  );
}
