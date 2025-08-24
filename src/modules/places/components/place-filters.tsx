"use client";

import { ChipCombobox } from "@/components/form/chip-combobox";
import { SearchFilter } from "@/components/search-filter";
import { PlaceCategory } from "@/db/types/places";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function PlaceFilters(props: { categories: PlaceCategory[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleCategory(category: PlaceCategory | undefined) {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("category", category.id);
    } else {
      params.delete("category");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="w-full sm:w-[250px]">
        <SearchFilter id="place-search" />
      </div>
      <div>
        <ChipCombobox
          label="Category"
          selectedValue={props.categories.find(
            (category) => category.id === searchParams.get("category")?.toString(),
          )}
          onSelectValue={(value) => handleCategory(value)}
          options={props.categories}
          optionFormatter={(place) => place.name}
          withSearch
        />
      </div>
    </div>
  );
}
