import { Heading1 } from "@/components/typography";
import { PlaceCategoryListWithFilters } from "@/modules/places/components/place-category-list-with-filters";

export default function PlaceCategoriesPage() {
  return (
    <div className="space-y-12 pb-20">
      <Heading1>Place Categories</Heading1>
      <section className="space-y-6">
        <PlaceCategoryListWithFilters />
      </section>
    </div>
  );
}
