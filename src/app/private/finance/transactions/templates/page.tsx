import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { fromUrlToPaginate } from "@/common/pagination";
import { newTransactionTemplateRoute } from "@/common/routes";
import { SearchFilter } from "@/components/search-filter";
import { Heading1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TransactionTemplatesList } from "@/modules/finance/components/transaction-templates-list";
import { getPaginatedTransactionTemplates } from "@/modules/finance/server-actions";

export const metadata: Metadata = {
  title: "Transaction Templates",
};

export default async function TransactionTemplatesPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    size?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { query, page, size } = searchParams ?? {};

  const { records, total } = await getPaginatedTransactionTemplates({
    paginate: fromUrlToPaginate({ page, size }),
    query,
  });

  return (
    <div className="space-y-12 pb-24">
      <Heading1>Transaction Templates</Heading1>
      <div className="fixed right-4 bottom-4 z-50 m-0 flex flex-col gap-2 sm:right-6 sm:bottom-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="size-14 rounded-xl" asChild>
              <Link href={newTransactionTemplateRoute} prefetch>
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
        <TransactionTemplatesList templates={records} total={total} />
      </div>
    </div>
  );
}
