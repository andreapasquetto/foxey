import { fromUrlToPaginate } from "@/common/pagination";
import { SearchFilter } from "@/components/search-filter";
import { Heading1 } from "@/components/typography";
import { TransactionCategoryList } from "@/modules/finance/components/transaction-category-list";
import { transactionCategoriesGetPaginated } from "@/modules/finance/finance-actions";
import { Metadata } from "next";

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
      <div className="space-y-6">
        <div className="w-full sm:w-[250px]">
          <SearchFilter paramName="query" />
        </div>
        <TransactionCategoryList categories={records} total={total} />
      </div>
    </div>
  );
}
