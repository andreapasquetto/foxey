import { newPlaceRoute } from "@/common/routes";
import { SearchFilter } from "@/components/search-filter";
import { Heading1, Heading2 } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlaceCategoryList } from "@/modules/places/components/place-category-list";
import { PlaceList } from "@/modules/places/components/place-list";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function PlacesPage(props: {
  searchParams?: Promise<{ place?: string; category?: string }>;
}) {
  const searchParams = await props.searchParams;
  const placeQuery = searchParams?.place;
  const categoryQuery = searchParams?.category;

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
        <div className="w-[250px]">
          <SearchFilter id="place-search" paramName="place" />
        </div>
        <PlaceList query={placeQuery} />
      </section>
      <section className="space-y-6">
        <Heading2>Categories</Heading2>
        <div className="w-[250px]">
          <SearchFilter id="place-category-search" paramName="category" />
        </div>
        <PlaceCategoryList query={categoryQuery} />
      </section>
    </div>
  );
}
