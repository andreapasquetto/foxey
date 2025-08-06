import { newPlaceRoute } from "@/common/routes";
import { SearchFilter } from "@/components/search-filter";
import { Heading1, Heading2 } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlaceCategoryList } from "@/modules/places/components/place-category-list";
import { PlaceFilters } from "@/modules/places/components/place-filters";
import { PlaceList } from "@/modules/places/components/place-list";
import { placeCategoriesGetAll } from "@/modules/places/places-actions";
import { Plus } from "lucide-react";
import Link from "next/link";

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
      <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
        <Link
          href={newPlaceRoute}
          className={cn(buttonVariants({ variant: "default" }), "h-14 w-14 rounded-xl")}
          prefetch
        >
          <Plus className="h-6 w-6" />
        </Link>
      </div>
      <section className="space-y-6">
        <PlaceFilters categories={categories} />
        <PlaceList query={query} categoryId={categoryId} />
      </section>
      <section className="space-y-6">
        <Heading2>Categories</Heading2>
        <div className="w-[250px]">
          <SearchFilter id="place-category-search" paramName="category-query" />
        </div>
        <PlaceCategoryList query={categoryQuery} />
      </section>
    </div>
  );
}
