import type { Metadata } from "next";
import { fromUrlToPaginate } from "@/common/pagination";
import { SearchFilter } from "@/components/search-filter";
import { Heading1 } from "@/components/typography";
import { PlaceCategoriesList } from "@/modules/places/components/place-categories-list";
import { getPaginatedPlaceCategories } from "@/modules/places/server-actions";

export const metadata: Metadata = {
  title: "Place Categories",
};

export default async function PlaceCategoriesPage(props: {
  searchParams: Promise<{ query?: string; page?: string; size?: string }>;
}) {
  const searchParams = await props.searchParams;
  const { query, page, size } = searchParams ?? {};
  const { records, total } = await getPaginatedPlaceCategories({
    paginate: fromUrlToPaginate({ page, size }),
    query,
  });

  return (
    <div className="space-y-12 pb-24">
      <Heading1>Place Categories</Heading1>
      <div className="space-y-6">
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <SearchFilter />
        </div>
        <PlaceCategoriesList categories={records} total={total} />
      </div>
    </div>
  );
}
