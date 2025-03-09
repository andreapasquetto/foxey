import { newTransactionCategoryRoute } from "@/common/routes";
import { Heading1 } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TransactionCategoryListWithFilters } from "@/modules/finance/components/transaction-category-list-with-filters";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function TransactionCategoriesPage() {
  return (
    <div className="space-y-12 pb-20">
      <Heading1>Transaction Categories</Heading1>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 sm:bottom-6 sm:right-6">
        <Link
          href={newTransactionCategoryRoute}
          className={cn(buttonVariants({ variant: "default" }), "h-14 w-14 rounded-xl")}
        >
          <Plus className="h-6 w-6" />
        </Link>
      </div>
      <section className="space-y-6">
        <TransactionCategoryListWithFilters />
      </section>
    </div>
  );
}
