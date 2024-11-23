import { Heading1, Heading2 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { ThisMonthExpensesChart } from "@/modules/accounting/components/charts/this-month-expenses-chart";
import { ThisMonthTrendChart } from "@/modules/accounting/components/charts/this-month-trend-chart";
import { ThisYearIncomeExpensesChart } from "@/modules/accounting/components/charts/this-year-income-expenses-chart";
import { ThisMonthStats } from "@/modules/accounting/components/this-month-stats";
import { Transactions } from "@/modules/accounting/components/transactions";
import { WalletList } from "@/modules/accounting/components/wallet-list";
import { ArrowRightLeft } from "lucide-react";
import Link from "next/link";

export default function AccountingPage() {
  return (
    <div className="space-y-12">
      <Heading1>Accounting</Heading1>
      <div className="mx-auto max-w-[250px] space-y-1">
        <Button size="lg" asChild className="w-full">
          <Link href="/accounting/transactions/new" className="gap-1">
            Add transaction <ArrowRightLeft className="h-5 w-5" />
          </Link>
        </Button>
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
