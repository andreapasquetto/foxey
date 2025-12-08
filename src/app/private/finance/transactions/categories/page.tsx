import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { fromUrlToPaginate } from "@/common/pagination";
import { newTransactionCategoryRoute } from "@/common/routes";
import { SearchFilter } from "@/components/search-filter";
import { Heading1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TransactionCategoryList } from "@/modules/finance/components/transaction-category-list";
import { transactionCategoriesGetPaginated } from "@/modules/finance/finance-actions";

export const metadata: Metadata = {
  title: "Transaction Categories",
};

export default async function TransactionCategoriesPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    size?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { query, page, size } = searchParams ?? {};

  const { records, total } = await transactionCategoriesGetPaginated({
    paginate: fromUrlToPaginate({ page, size }),
    query,
  });

  return (
    <div className="space-y-12 pb-24">
      <Heading1>Transaction Categories</Heading1>
      <div className="fixed right-4 bottom-4 z-50 m-0 flex flex-col gap-2 sm:right-6 sm:bottom-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="size-14 rounded-xl" asChild>
              <Link href={newTransactionCategoryRoute} prefetch>
                <Plus className="size-6" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New</TooltipContent>
        </Tooltip>
      </div>
      <div className="space-y-6">
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <SearchFilter />
        </div>
        <TransactionCategoryList categories={records} total={total} />
      </div>
    </div>
  );
}
