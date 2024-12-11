import { Heading1, Heading2 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThisMonthExpensesChart } from "@/modules/accounting/components/charts/this-month-expenses-chart";
import { ThisMonthExpensesPerDayChart } from "@/modules/accounting/components/charts/this-month-expenses-per-day-chart";
import { ThisMonthTrendChart } from "@/modules/accounting/components/charts/this-month-trend-chart";
import { ThisYearIncomeExpensesChart } from "@/modules/accounting/components/charts/this-year-income-expenses-chart";
import { ThisMonthStats } from "@/modules/accounting/components/this-month-stats";
import { Transactions } from "@/modules/accounting/components/transactions";
import { WalletList } from "@/modules/accounting/components/wallet-list";
import { ArrowRightLeft, Plus, Wallet } from "lucide-react";
import Link from "next/link";

export default function AccountingPage() {
  return (
    <div className="space-y-12 pb-20">
      <Heading1>Accounting</Heading1>
      <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-14 w-14 rounded-xl">
              <Plus className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4 w-[250px] sm:mr-6">
            <DropdownMenuItem asChild>
              <Link
                href="/accounting/transactions/new"
                className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
              >
                Add transaction <ArrowRightLeft className="h-5 w-5" />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/accounting/wallets/new"
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
        <Heading2>Wallets</Heading2>
        <WalletList />
      </section>
      <section className="space-y-6">
        <Heading2>This month</Heading2>
        <ThisMonthStats />
        <ThisMonthExpensesPerDayChart />
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <ThisMonthTrendChart />
          <ThisMonthExpensesChart />
        </div>
      </section>
      <section className="space-y-6">
        <Heading2>This year</Heading2>
        <ThisYearIncomeExpensesChart />
      </section>
    </div>
  );
}
