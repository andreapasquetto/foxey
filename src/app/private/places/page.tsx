import { SearchFilter } from "@/components/search-filter";
import { Heading1, Heading2 } from "@/components/typography";
import { PlaceCategoryList } from "@/modules/places/components/place-category-list";
import { PlaceFilters } from "@/modules/places/components/place-filters";
import { PlaceList } from "@/modules/places/components/place-list";
import { PlacesActionButtons } from "@/modules/places/components/places-action-buttons";
import { placeCategoriesGetAll } from "@/modules/places/places-actions";

export default async function PlacesPage(props: {
  searchParams?: Promise<{
    query?: string;
    ["category-query"]?: string;
    category?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const { query, ["category-query"]: categoryQuery, category: categoryId } = searchParams ?? {};

  const categories = await placeCategoriesGetAll();

  return (
    <div className="space-y-12 pb-24">
      <Heading1>Places</Heading1>
      <PlacesActionButtons />
      <section className="space-y-6">
        <PlaceFilters categories={categories} />
        <PlaceList query={query} categoryId={categoryId} />
      </section>
      <section className="space-y-6">
        <Heading2>Categories</Heading2>
        <div className="w-full sm:w-[250px]">
          <SearchFilter id="place-category-search" paramName="category-query" />
        </div>
        <PlaceCategoryList query={categoryQuery} />
      </section>
    </div>
  );
}
