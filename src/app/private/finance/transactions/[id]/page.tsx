import type { Metadata } from "next";
import { Heading1 } from "@/components/typography";
import { TransactionUpdateForm } from "@/modules/finance/components/forms/transaction-update-form";
import {
  transactionCategoriesGetAll,
  transactionsGetById,
} from "@/modules/finance/finance-actions";
import { placesGetAll } from "@/modules/places/places-actions";

export const metadata: Metadata = {
  title: "Transaction Details",
};

export default async function TransactionUpdatePage(props: {
  params: Promise<{ id: string }>;
}) {
  const id = (await props.params).id;

  const categories = await transactionCategoriesGetAll();
  const places = await placesGetAll();
  const transaction = await transactionsGetById(id);

  return (
    <div className="space-y-12">
      <Heading1>Edit Transaction</Heading1>
      <TransactionUpdateForm
        categories={categories}
        places={places}
        transaction={transaction}
      />
    </div>
  );
}
