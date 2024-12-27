"use client";

import { Input } from "@/components/ui/input";
import { PlaceCategoryList } from "@/modules/places/components/place-category-list";
import { useState } from "react";

export function PlaceCategoryListWithFilters() {
  const [searchFilter, setSearchFilter] = useState<string>("");

  return (
    <>
      <div className="flex-wrap items-center gap-3 space-y-3 sm:flex sm:space-y-0">
        <div className="shrink-0 sm:w-[250px]">
          <Input
            id="searchPlaceCategory"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search..."
          />
        </div>
      </div>
      <PlaceCategoryList searchFilter={searchFilter} />
    </>
  );
}
