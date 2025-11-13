import type { Metadata } from "next";
import { Heading1, Heading2 } from "@/components/typography";
import { FinanceActionButtons } from "@/modules/finance/components/finance-action-buttons";
import { LatestTransactions } from "@/modules/finance/components/latest-transactions";
import { TagsTable } from "@/modules/finance/components/tags-table";
import { WalletList } from "@/modules/finance/components/wallet-list";
import { transactionsGetAll } from "@/modules/finance/finance-actions";
import { MonthSection } from "@/modules/finance/sections/month-section";
import { YearSection } from "@/modules/finance/sections/year-section";

export const metadata: Metadata = {
  title: "Finance",
};

export default async function FinancePage() {
  const transactions = await transactionsGetAll();

  return (
    <div className="space-y-12 pb-24">
      <Heading1>Finance</Heading1>
      <FinanceActionButtons />
      <section className="space-y-6">
        <Heading2>Latest Transactions</Heading2>
        <LatestTransactions />
      </section>
      <section className="space-y-6">
        <Heading2>By month</Heading2>
        <MonthSection transactions={transactions} />
      </section>
      <section className="space-y-6">
        <Heading2>By year</Heading2>
        <YearSection transactions={transactions} />
      </section>
      <section className="space-y-6">
        <Heading2>Tags</Heading2>
        <TagsTable />
      </section>
      <section className="space-y-6">
        <Heading2>Wallets</Heading2>
        <WalletList />
      </section>
    </div>
  );
}
