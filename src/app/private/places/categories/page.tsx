import { fromUrlToPaginate } from "@/common/pagination";
import { SearchFilter } from "@/components/search-filter";
import { Heading1 } from "@/components/typography";
import { PlaceCategoryList } from "@/modules/places/components/place-category-list";
import { placeCategoriesGetPaginated } from "@/modules/places/places-actions";

export default async function PlaceCategoriesPage(props: {
  searchParams: Promise<{ query?: string; page?: string; size?: string }>;
}) {
  const searchParams = await props.searchParams;
  const { query, page, size } = searchParams ?? {};
  const { records, total } = await placeCategoriesGetPaginated({
    paginate: fromUrlToPaginate({ page, size }),
    query,
  });

  return (
    <div className="space-y-12 pb-24">
      <Heading1>Place Categories</Heading1>
      <div className="space-y-6">
        <div className="w-full sm:w-[250px]">
          <SearchFilter id="place-category-search" paramName="query" />
        </div>
        <PlaceCategoryList categories={records} total={total} />
      </div>
    </div>
  );
}
