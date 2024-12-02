import { Heading1 } from "@/components/typography";
import { TransactionUpdateForm } from "@/modules/accounting/components/forms/transaction-update-form";

interface TransactionUpdatePageProps {
  params: Promise<{ id: string }>;
}

export default async function TransactionUpdatePage(props: TransactionUpdatePageProps) {
  const id = (await props.params).id;

  return (
    <div className="space-y-12">
      <Heading1>Edit Transaction</Heading1>
      <TransactionUpdateForm id={id} />
    </div>
  );
}
