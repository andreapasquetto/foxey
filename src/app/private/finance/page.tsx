import { newTransactionRoute, newWalletRoute, transactionCategoriesRoute } from "@/common/routes";
import { Heading1, Heading2 } from "@/components/typography";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ThisMonthExpensesPerDayChart } from "@/modules/finance/components/charts/this-month-expenses-per-day-chart";
import { ThisMonthExpensesTable } from "@/modules/finance/components/charts/this-month-expenses-table";
import { ThisMonthIncomeTable } from "@/modules/finance/components/charts/this-month-income-table";
import { ThisMonthTrendChart } from "@/modules/finance/components/charts/this-month-trend-chart";
import { ThisYearIncomeExpensesChart } from "@/modules/finance/components/charts/this-year-income-expenses-chart";
import { ThisYearTrendChart } from "@/modules/finance/components/charts/this-year-trend-chart";
import { ThisMonthStats } from "@/modules/finance/components/this-month-stats";
import { ThisYearStats } from "@/modules/finance/components/this-year-stats";
import { Transactions } from "@/modules/finance/components/transactions";
import { WalletList } from "@/modules/finance/components/wallet-list";
import { ArrowRightLeft, Plus, Shapes, Wallet } from "lucide-react";
import Link from "next/link";

export default function FinancePage() {
  return (
    <div className="space-y-12 pb-20">
      <Heading1>Finance</Heading1>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 sm:bottom-6 sm:right-6">
        <Link
          href={transactionCategoriesRoute}
          className={cn(buttonVariants({ variant: "outline" }), "h-14 w-14 rounded-xl")}
          prefetch
        >
          <Shapes className="h-6 w-6" />
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-14 w-14 rounded-xl">
              <Plus className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4 w-[250px] sm:mr-6">
            <DropdownMenuItem asChild>
              <Link
                href={newTransactionRoute}
                className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
              >
                Add transaction <ArrowRightLeft className="h-5 w-5" />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={newWalletRoute}
                className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
              >
                Add wallet <Wallet className="h-5 w-5" />
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <section className="space-y-6">
        <Heading2>Transactions</Heading2>
        <Transactions />
      </section>
      <section className="space-y-6">
        <Heading2>This month</Heading2>
        <ThisMonthStats />
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <ThisMonthIncomeTable />
          <ThisMonthExpensesTable />
        </div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <ThisMonthTrendChart />
          <ThisMonthExpensesPerDayChart />
        </div>
      </section>
      <section className="space-y-6">
        <Heading2>This year</Heading2>
        <ThisYearStats />
        <ThisYearTrendChart />
        <ThisYearIncomeExpensesChart />
      </section>
      <section className="space-y-6">
        <Heading2>Wallets</Heading2>
        <WalletList />
      </section>
    </div>
  );
}
