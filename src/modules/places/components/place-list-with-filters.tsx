"use client";

import { IdName } from "@/common/types";
import { ChipCombobox } from "@/components/form/chip-combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PlaceList } from "@/modules/places/components/place-list";
import { usePlaceCategoriesGetAllQuery } from "@/modules/places/places-queries";
import { useState } from "react";

export function PlaceListWithFilters() {
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<IdName | undefined>(undefined);
  const [onlyVisited, setOnlyVisited] = useState(false);

  const categoriesQuery = usePlaceCategoriesGetAllQuery();

  return (
    <>
      <div className="flex-wrap items-center gap-3 space-y-3 sm:flex sm:space-y-0">
        <div className="shrink-0 sm:w-[250px]">
          <Input
            id="searchPlace"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search..."
          />
        </div>
        <div>
          <ChipCombobox
            label="Category"
            selectedValue={selectedCategory}
            onSelectValue={setSelectedCategory}
            options={categoriesQuery.data}
            optionIndexer={(option) => option.name}
            optionFormatter={(option) => <div>{option.name}</div>}
            withSearch
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="onlyVisited" className="font-normal">
            Only visited places
          </Label>
          <Switch id="onlyVisited" checked={onlyVisited} onCheckedChange={setOnlyVisited} />
        </div>
      </div>
      <PlaceList
        searchFilter={searchFilter}
        categoryId={selectedCategory?.id}
        onlyVisited={onlyVisited}
      />
    </>
  );
}
