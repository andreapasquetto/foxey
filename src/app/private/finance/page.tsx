import { SearchFilter } from "@/components/search-filter";
import { Heading1, Heading2 } from "@/components/typography";
import { FinanceActionButtons } from "@/modules/finance/components/finance-action-buttons";
import { TransactionCategoryList } from "@/modules/finance/components/transaction-category-list";
import { TransactionFilters } from "@/modules/finance/components/transaction-filters";
import { TransactionList } from "@/modules/finance/components/transaction-list";
import { WalletList } from "@/modules/finance/components/wallet-list";
import {
  transactionCategoriesGetAll,
  transactionsGetAll,
  walletsGetAll,
} from "@/modules/finance/finance-actions";
import { MonthSection } from "@/modules/finance/sections/month-section";
import { YearSection } from "@/modules/finance/sections/year-section";
import { placesGetAll } from "@/modules/places/places-actions";

export default async function FinancePage(props: {
  searchParams?: Promise<{
    query?: string;
    ["category-query"]?: string;
    category?: string;
    place?: string;
    wallet?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const {
    query,
    ["category-query"]: categoryQuery,
    category: categoryId,
    place: placeId,
    wallet: walletId,
  } = searchParams ?? {};

  const categories = await transactionCategoriesGetAll();
  const places = await placesGetAll();
  const wallets = await walletsGetAll();

  const transactions = await transactionsGetAll({
    query,
    categoryId,
    placeId,
    walletId,
  });

  return (
    <div className="space-y-12 pb-24">
      <Heading1>Finance</Heading1>
      <FinanceActionButtons />
      <section className="space-y-6">
        <Heading2>Transactions</Heading2>
        <TransactionFilters categories={categories} wallets={wallets} places={places} />
        <TransactionList transactions={transactions} />
      </section>
      <MonthSection transactions={transactions} />
      <YearSection transactions={transactions} />
      <section className="space-y-6">
        <Heading2>Wallets</Heading2>
        <WalletList />
      </section>
      <section className="space-y-6">
        <Heading2>Categories</Heading2>
        <div className="w-full sm:w-[250px]">
          <SearchFilter paramName="category-query" />
        </div>
        <TransactionCategoryList query={categoryQuery} />
      </section>
    </div>
  );
}
