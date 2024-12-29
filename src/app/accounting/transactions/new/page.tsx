import { Heading1 } from "@/components/typography";
import { TransactionCreateForm } from "@/modules/accounting/components/forms/transaction-create-form";

export default function TransactionCreatePage() {
  return (
    <div className="space-y-12">
      <Heading1>New Transaction</Heading1>
      <TransactionCreateForm />
    </div>
  );
}
