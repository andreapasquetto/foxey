import { SearchFilter } from "@/components/search-filter";
import { Heading1, Heading2 } from "@/components/typography";
import { ThisMonthExpensesPerDayChart } from "@/modules/finance/components/charts/this-month-expenses-per-day-chart";
import { ThisMonthExpensesTable } from "@/modules/finance/components/charts/this-month-expenses-table";
import { ThisMonthIncomeTable } from "@/modules/finance/components/charts/this-month-income-table";
import { ThisMonthTrendChart } from "@/modules/finance/components/charts/this-month-trend-chart";
import { ThisYearIncomeExpensesChart } from "@/modules/finance/components/charts/this-year-income-expenses-chart";
import { ThisYearTrendChart } from "@/modules/finance/components/charts/this-year-trend-chart";
import { FinanceActionButtons } from "@/modules/finance/components/finance-action-buttons";
import { ThisMonthStats } from "@/modules/finance/components/this-month-stats";
import { ThisYearStats } from "@/modules/finance/components/this-year-stats";
import { TransactionCategoryList } from "@/modules/finance/components/transaction-category-list";
import { TransactionList } from "@/modules/finance/components/transaction-list";
import { WalletList } from "@/modules/finance/components/wallet-list";
import { transactionsGetAll } from "@/modules/finance/finance-actions";

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
      <FinanceActionButtons />
      <section className="space-y-6">
        <Heading2>Transactions</Heading2>
        <div className="w-[250px]">
          <SearchFilter paramName="transaction" />
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
        <div className="w-[250px]">
          <SearchFilter paramName="category" />
        </div>
        <TransactionCategoryList query={categoryQuery} />
      </section>
    </div>
  );
}
