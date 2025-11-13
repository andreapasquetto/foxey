import type { Metadata } from "next";
import { Heading1 } from "@/components/typography";
import { TransactionCategoryCreateForm } from "@/modules/finance/components/forms/transaction-category-create-form";

export const metadata: Metadata = {
  title: "New Transaction Category",
};

export default function TransactionCategoryCreatePage() {
  return (
    <div className="space-y-12">
      <Heading1>New Transaction Category</Heading1>
      <TransactionCategoryCreateForm />
    </div>
  );
}
