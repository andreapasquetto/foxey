import { Heading1 } from "@/components/typography";
import { PlaceListWithFilters } from "@/modules/places/components/place-list-with-filters";

export default function PlacesPage() {
  return (
    <div className="space-y-12 pb-20">
      <Heading1>Places</Heading1>
      <section>
        <PlaceListWithFilters />
      </section>
    </div>
  );
}
