import { Heading1 } from "@/components/typography";
import { TransactionCreateForm } from "@/modules/finance/components/forms/transaction-create-form";
import {
  transactionCategoriesGetAll,
  transactionTemplatesGetAll,
  walletsGetAll,
} from "@/modules/finance/finance-actions";
import { placesGetAll } from "@/modules/places/places-actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Transaction",
};

export default async function TransactionCreatePage() {
  const templates = await transactionTemplatesGetAll();
  const wallets = await walletsGetAll();
  const categories = await transactionCategoriesGetAll();
  const places = await placesGetAll();
  return (
    <div className="space-y-12">
      <Heading1>New Transaction</Heading1>
      <TransactionCreateForm
        templates={templates}
        wallets={wallets}
        categories={categories}
        places={places}
      />
    </div>
  );
}
