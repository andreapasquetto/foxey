import { Heading1 } from "@/components/typography";
import { TransactionCategoryCreateForm } from "@/modules/finance/components/forms/transaction-category-create-form";

export default function TransactionCategoryCreatePage() {
  return (
    <div className="space-y-12">
      <Heading1>New Category</Heading1>
      <TransactionCategoryCreateForm />
    </div>
  );
}
