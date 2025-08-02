import { newTransactionCategoryRoute, newTransactionRoute, newWalletRoute } from "@/common/routes";
import { SearchFilter } from "@/components/search-filter";
import { Heading1, Heading2 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThisMonthExpensesPerDayChart } from "@/modules/finance/components/charts/this-month-expenses-per-day-chart";
import { ThisMonthExpensesTable } from "@/modules/finance/components/charts/this-month-expenses-table";
import { ThisMonthIncomeTable } from "@/modules/finance/components/charts/this-month-income-table";
import { ThisMonthTrendChart } from "@/modules/finance/components/charts/this-month-trend-chart";
import { ThisYearIncomeExpensesChart } from "@/modules/finance/components/charts/this-year-income-expenses-chart";
import { ThisYearTrendChart } from "@/modules/finance/components/charts/this-year-trend-chart";
import { ThisMonthStats } from "@/modules/finance/components/this-month-stats";
import { ThisYearStats } from "@/modules/finance/components/this-year-stats";
import { TransactionCategoryList } from "@/modules/finance/components/transaction-category-list";
import { TransactionList } from "@/modules/finance/components/transaction-list";
import { WalletList } from "@/modules/finance/components/wallet-list";
import { transactionsGetAll } from "@/modules/finance/finance-actions";
import { ArrowRightLeft, Plus, Shapes, Wallet } from "lucide-react";
import Link from "next/link";

export default async function FinancePage(props: {
  searchParams?: Promise<{ query?: string; category?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query;
  const categoryQuery = searchParams?.category;

  const transactions = await transactionsGetAll({
    query,
  });
  return (
    <div className="space-y-12 pb-24">
      <Heading1>Finance</Heading1>
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
                href={newTransactionCategoryRoute}
                className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
              >
                Add category <Shapes className="h-5 w-5" />
              </Link>
            </DropdownMenuItem>
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
        <div className="w-[250px]">
          <SearchFilter />
        </div>
        <TransactionList transactions={transactions} />
      </section>
      <section className="space-y-6">
        <Heading2>This month</Heading2>
        <ThisMonthStats transactions={transactions} />
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <ThisMonthIncomeTable transactions={transactions} />
          <ThisMonthExpensesTable transactions={transactions} />
        </div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <ThisMonthTrendChart transactions={transactions} />
          <ThisMonthExpensesPerDayChart transactions={transactions} />
        </div>
      </section>
      <section className="space-y-6">
        <Heading2>This year</Heading2>
        <ThisYearStats transactions={transactions} />
        <ThisYearTrendChart transactions={transactions} />
        <ThisYearIncomeExpensesChart transactions={transactions} />
      </section>
      <section className="space-y-6">
        <Heading2>Wallets</Heading2>
        <WalletList />
      </section>
      <section className="space-y-6">
        <Heading2>Categories</Heading2>
        <TransactionCategoryList query={categoryQuery} />
      </section>
    </div>
  );
}
