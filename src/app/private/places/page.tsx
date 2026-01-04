import type { Metadata } from "next";
import { fromUrlToPaginate } from "@/common/pagination";
import { Heading1 } from "@/components/typography";
import { PlacesActionButtons } from "@/modules/places/components/places-action-buttons";
import { PlacesFilters } from "@/modules/places/components/places-filters";
import { PlacesList } from "@/modules/places/components/places-list";
import {
  getAllPlaceCategories,
  getPaginatedPlaces,
} from "@/modules/places/server-actions";

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

  const categories = await getAllPlaceCategories();
  const { records, total } = await getPaginatedPlaces({
    paginate: fromUrlToPaginate({ page, size }),
    query,
    categoryId,
  });

  return (
    <div className="space-y-12 pb-24">
      <Heading1>Places</Heading1>
      <PlacesActionButtons />
      <section className="space-y-6">
        <PlacesFilters categories={categories} />
        <PlacesList places={records} total={total} />
      </section>
    </div>
  );
}
