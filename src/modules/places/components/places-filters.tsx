"use client";

import { useSearchParams } from "next/navigation";
import { useSearchFilters } from "@/common/hooks/use-search-filters";
import { ChipCombobox } from "@/components/form/chip-combobox";
import { SearchFilter } from "@/components/search-filter";
import type { PlaceCategory } from "@/db/types/places";

export function PlacesFilters({ categories }: { categories: PlaceCategory[] }) {
  const searchParams = useSearchParams();
  const searchFilters = useSearchFilters();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="w-full md:w-1/2 lg:w-1/3">
        <SearchFilter />
      </div>
      <div>
        <ChipCombobox
          label="Category"
          selectedValue={categories.find(
            (category) =>
              category.id === searchParams.get("category")?.toString(),
          )}
          onSelectValue={(value) =>
            searchFilters.handleSearch({ category: value?.id })
          }
          options={categories}
          optionFormatter={(place) => place.name}
          withSearch
        />
      </div>
    </div>
  );
}
