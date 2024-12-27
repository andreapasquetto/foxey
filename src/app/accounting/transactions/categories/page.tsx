import { Heading1 } from "@/components/typography";
import { TransactionCategoryListWithFilters } from "@/modules/accounting/components/transaction-category-list-with-filters";

export default function TransactionCategoriesPage() {
  return (
    <div className="space-y-12 pb-20">
      <Heading1>Transaction Categories</Heading1>
      <section>
        <TransactionCategoryListWithFilters />
      </section>
    </div>
  );
}
