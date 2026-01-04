import type { Metadata } from "next";
import { Heading1 } from "@/components/typography";
import { CreateTransactionTemplateForm } from "@/modules/finance/components/forms/create-transaction-template-form";
import {
  getAllTransactionCategories,
  getAllWallets,
} from "@/modules/finance/server-actions";
import { getAllPlaces } from "@/modules/places/server-actions";

export const metadata: Metadata = {
  title: "New Transaction Template",
};

export default async function NewTransactionTemplatePage() {
  const wallets = await getAllWallets();
  const categories = await getAllTransactionCategories();
  const places = await getAllPlaces();
  return (
    <div className="space-y-12">
      <Heading1>New Transaction Template</Heading1>
      <CreateTransactionTemplateForm
        wallets={wallets}
        categories={categories}
        places={places}
      />
    </div>
  );
}
