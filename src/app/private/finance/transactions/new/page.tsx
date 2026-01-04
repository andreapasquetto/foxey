import type { Metadata } from "next";
import { Heading1 } from "@/components/typography";
import { CreateTransactionForm } from "@/modules/finance/components/forms/create-transaction-form";
import {
  getAllTags,
  getAllTransactionCategories,
  getAllTransactionTemplates,
  getAllWallets,
} from "@/modules/finance/server-actions";
import { getAllPlaces } from "@/modules/places/server-actions";

export const metadata: Metadata = {
  title: "New Transaction",
};

export default async function NewTransactionPage() {
  const templates = await getAllTransactionTemplates();
  const wallets = await getAllWallets();
  const categories = await getAllTransactionCategories();
  const places = await getAllPlaces();
  const tags = await getAllTags();
  return (
    <div className="space-y-12 pb-24">
      <Heading1>New Transaction</Heading1>
      <CreateTransactionForm
        templates={templates}
        wallets={wallets}
        categories={categories}
        places={places}
        tags={tags}
      />
    </div>
  );
}
