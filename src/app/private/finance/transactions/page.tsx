import { endOfDay, parse, startOfDay } from "date-fns";
import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { fromUrlToPaginate } from "@/common/pagination";
import { newTransactionRoute } from "@/common/routes";
import { Heading1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TransactionsFilters } from "@/modules/finance/components/transactions-filters";
import { TransactionsList } from "@/modules/finance/components/transactions-list";
import {
  getAllTransactionCategories,
  getAllWallets,
  getPaginatedTransactions,
} from "@/modules/finance/server-actions";
import { getAllPlaces } from "@/modules/places/server-actions";

export const metadata: Metadata = {
  title: "Transactions",
};

export default async function TransactionsPage(props: {
  searchParams?: Promise<{
    query?: string;
    category?: string;
    place?: string;
    wallet?: string;
    page?: string;
    size?: string;
    from?: string;
    to?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { query, category, place, wallet, page, size, from, to } =
    searchParams ?? {};

  const categories = await getAllTransactionCategories();
  const places = await getAllPlaces();
  const wallets = await getAllWallets();
  const { records, total } = await getPaginatedTransactions({
    paginate: fromUrlToPaginate({ page, size }),
    dateRange:
      from && to
        ? {
            from: startOfDay(parse(from, "yyyy-MM-dd", new Date())),
            to: endOfDay(parse(to, "yyyy-MM-dd", new Date())),
          }
        : undefined,
    query,
    categoryId: category,
    placeId: place,
    walletId: wallet,
  });

  return (
    <div className="space-y-12 pb-24">
      <Heading1>Transactions</Heading1>
      <div className="fixed right-4 bottom-4 z-50 m-0 flex flex-col gap-2 sm:right-6 sm:bottom-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="size-14 rounded-xl" asChild>
              <Link href={newTransactionRoute} prefetch>
                <Plus className="size-6" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New</TooltipContent>
        </Tooltip>
      </div>
      <div className="space-y-6">
        <TransactionsFilters
          categories={categories}
          places={places}
          wallets={wallets}
        />
        <TransactionsList transactions={records} total={total} />
      </div>
    </div>
  );
}
