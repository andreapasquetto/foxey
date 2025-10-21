"use client";

import { useSearchFilters } from "@/common/hooks/use-search-filters";
import { ChipCombobox } from "@/components/form/chip-combobox";
import { SearchFilter } from "@/components/search-filter";
import { TransactionCategory, Wallet } from "@/db/types/finance";
import { Place } from "@/db/types/places";
import { useSearchParams } from "next/navigation";

export function TransactionFilters(props: {
  categories: TransactionCategory[];
  wallets: Wallet[];
  places: Place[];
}) {
  const searchParams = useSearchParams();
  const searchFilters = useSearchFilters();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="w-full sm:w-[250px]">
        <SearchFilter paramName="query" />
      </div>
      <div>
        <ChipCombobox
          label="Category"
          selectedValue={props.categories.find(
            (category) => category.id === searchParams.get("category")?.toString(),
          )}
          onSelectValue={(value) => searchFilters.handleSearch({ category: value?.id })}
          options={props.categories}
          optionFormatter={(category) => category.name}
          withSearch
        />
      </div>
      <div>
        <ChipCombobox
          label="Place"
          selectedValue={props.places.find(
            (place) => place.id === searchParams.get("place")?.toString(),
          )}
          onSelectValue={(value) => searchFilters.handleSearch({ place: value?.id })}
          options={props.places}
          optionFormatter={(place) => place.name}
          withSearch
        />
      </div>
      <div>
        <ChipCombobox
          label="Wallet"
          selectedValue={props.wallets.find(
            (wallet) => wallet.id === searchParams.get("wallet")?.toString(),
          )}
          onSelectValue={(value) => searchFilters.handleSearch({ wallet: value?.id })}
          options={props.wallets}
          optionFormatter={(wallet) => wallet.name}
          withSearch
        />
      </div>
    </div>
  );
}
