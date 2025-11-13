import { Heading1 } from "@/components/typography";
import { TransactionTemplateCreateForm } from "@/modules/finance/components/forms/transaction-template-create-form";
import {
  transactionCategoriesGetAll,
  walletsGetAll,
} from "@/modules/finance/finance-actions";
import { placesGetAll } from "@/modules/places/places-actions";

export default async function TransactionTemplateCreatePage() {
  const wallets = await walletsGetAll();
  const categories = await transactionCategoriesGetAll();
  const places = await placesGetAll();
  return (
    <div className="space-y-12">
      <Heading1>New Template</Heading1>
      <TransactionTemplateCreateForm
        wallets={wallets}
        categories={categories}
        places={places}
      />
    </div>
  );
}
