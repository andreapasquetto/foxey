import { fromUrlToPaginate } from "@/common/pagination";
import { Heading1 } from "@/components/typography";
import { PlaceFilters } from "@/modules/places/components/place-filters";
import { PlaceList } from "@/modules/places/components/place-list";
import { PlacesActionButtons } from "@/modules/places/components/places-action-buttons";
import { placeCategoriesGetAll, placesGetPaginated } from "@/modules/places/places-actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Places",
};

export default async function PlacesPage(props: {
  searchParams?: Promise<{
    query?: string;
    category?: string;
    page?: string;
    size?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { query, category: categoryId, page, size } = searchParams ?? {};

  const categories = await placeCategoriesGetAll();
  const { records, total } = await placesGetPaginated({
    paginate: fromUrlToPaginate({ page, size }),
    query,
    categoryId,
  });

  return (
    <div className="space-y-12 pb-24">
      <Heading1>Places</Heading1>
      <PlacesActionButtons />
      <section className="space-y-6">
        <PlaceFilters categories={categories} />
        <PlaceList places={records} total={total} />
      </section>
    </div>
  );
}
