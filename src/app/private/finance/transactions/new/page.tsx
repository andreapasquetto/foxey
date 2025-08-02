import { Heading1 } from "@/components/typography";
import { TransactionCreateForm } from "@/modules/finance/components/forms/transaction-create-form";
import { transactionCategoriesGetAll, walletsGetAll } from "@/modules/finance/finance-actions";
import { placesGetAll } from "@/modules/places/places-actions";

export default async function TransactionCreatePage() {
  const wallets = await walletsGetAll();
  const categories = await transactionCategoriesGetAll();
  const places = await placesGetAll();
  return (
    <div className="space-y-12">
      <Heading1>New Transaction</Heading1>
      <TransactionCreateForm wallets={wallets} categories={categories} places={places} />
    </div>
  );
}
