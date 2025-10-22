"use client";

import { usePagination } from "@/common/hooks/use-pagination";
import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
import { Pagination } from "@/components/pagination";
import { Place } from "@/db/types/places";
import { PlaceCard } from "@/modules/places/components/place-card";

export function PlaceList({ places, total }: { places: Place[]; total: number }) {
  const pagination = usePagination(total);

  if (!places.length) {
    return <EmptyStateMessage message="There are no places." />;
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {places.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
      <Pagination {...pagination} />
    </div>
  );
}
