import type { Metadata } from "next";
import { Heading1 } from "@/components/typography";
import { CreateTransactionCategoryForm } from "@/modules/finance/components/forms/create-transaction-category-form";

export const metadata: Metadata = {
  title: "New Transaction Category",
};

export default function NewTransactionCategoryPage() {
  return (
    <div className="space-y-12">
      <Heading1>New Transaction Category</Heading1>
      <CreateTransactionCategoryForm />
    </div>
  );
}
