import type { Metadata } from "next";
import { Heading1 } from "@/components/typography";
import { UpdateTransactionForm } from "@/modules/finance/components/forms/update-transaction-form";
import {
  getAllTags,
  getAllTransactionCategories,
  getTransactionById,
} from "@/modules/finance/server-actions";
import { getAllPlaces } from "@/modules/places/server-actions";

export const metadata: Metadata = {
  title: "Transaction Details",
};

export default async function UpdateTransactionPage(props: {
  params: Promise<{ id: string }>;
}) {
  const id = (await props.params).id;

  const categories = await getAllTransactionCategories();
  const places = await getAllPlaces();
  const tags = await getAllTags();
  const transaction = await getTransactionById(id);

  return (
    <div className="space-y-12">
      <Heading1>Edit Transaction</Heading1>
      <UpdateTransactionForm
        categories={categories}
        places={places}
        tags={tags}
        transaction={transaction}
      />
    </div>
  );
}
