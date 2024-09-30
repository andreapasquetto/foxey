import { Heading1 } from "@/components/typography";
import AccountingStats from "@/modules/accounting/components/accounting-stats";
import { Transactions } from "@/modules/accounting/components/transactions";

export default function AccountingPage() {
  return (
    <section>
      <div className="mb-6">
        <Heading1>Accounting</Heading1>
      </div>
      <div className="mt-3 space-y-3">
        <AccountingStats />
        <Transactions />
      </div>
    </section>
  );
}
