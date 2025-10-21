import { paginationDefaults } from "@/common/pagination";
import { Heading1 } from "@/components/typography";
import { TransactionFilters } from "@/modules/finance/components/transaction-filters";
import { TransactionList } from "@/modules/finance/components/transaction-list";
import {
  transactionCategoriesGetAll,
  transactionsGetPaginated,
  walletsGetAll,
} from "@/modules/finance/finance-actions";
import { placesGetAll } from "@/modules/places/places-actions";

export default async function TransactionsPage(props: {
  searchParams?: Promise<{
    query?: string;
    category?: string;
    place?: string;
    wallet?: string;
    page?: string;
    size?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { query, category, place, wallet, page, size } = searchParams ?? {};

  const categories = await transactionCategoriesGetAll();
  const places = await placesGetAll();
  const wallets = await walletsGetAll();
  const { records, total } = await transactionsGetPaginated({
    paginate: {
      page: Number(page ?? paginationDefaults.page),
      pageSize: Number(size ?? paginationDefaults.pageSize),
    },
    query,
    categoryId: category,
    placeId: place,
    walletId: wallet,
  });

  return (
    <div className="space-y-12 pb-24">
      <Heading1>Transactions</Heading1>
      <div className="space-y-6">
        <TransactionFilters categories={categories} places={places} wallets={wallets} />
        <TransactionList transactions={records} total={total} />
      </div>
    </div>
  );
}
