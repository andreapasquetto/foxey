"use client";

import { format, parse } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { useSearchFilters } from "@/common/hooks/use-search-filters";
import { ChipCombobox } from "@/components/form/chip-combobox";
import { RangeDatePicker } from "@/components/form/range-date-picker";
import { SearchFilter } from "@/components/search-filter";
import type { TransactionCategory, Wallet } from "@/db/types/finance";
import type { Place } from "@/db/types/places";

export function TransactionFilters(props: {
  categories: TransactionCategory[];
  wallets: Wallet[];
  places: Place[];
}) {
  const searchFilters = useSearchFilters();
  const searchParams = useSearchParams();

  const dateRangeSearchParams = {
    from: searchParams.get("from"),
    to: searchParams.get("to"),
  };

  const [dateRange, setDateRange] = useState<DateRange>({
    from: dateRangeSearchParams.from
      ? parse(dateRangeSearchParams.from, "yyyy-MM-dd", new Date())
      : undefined,
    to: dateRangeSearchParams.to
      ? parse(dateRangeSearchParams.to, "yyyy-MM-dd", new Date())
      : undefined,
  });

  function handleDateRangeChange(value: DateRange | undefined) {
    setDateRange({ from: value?.from, to: value?.to });
    searchFilters.handleSearch({
      from: value?.from ? format(value.from, "yyyy-MM-dd") : undefined,
      to: value?.to ? format(value.to, "yyyy-MM-dd") : undefined,
      page: undefined,
    });
  }

  return (
    <div className="space-y-2">
      <div className="space-y-2 md:space-y-0 md:flex md:items-center md:gap-2">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <SearchFilter />
        </div>
        <div className="w-full md:w-[300px]">
          <RangeDatePicker
            dateRange={dateRange}
            setDateRange={handleDateRangeChange}
            showPresets
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div>
          <ChipCombobox
            label="Category"
            selectedValue={props.categories.find(
              (category) =>
                category.id === searchParams.get("category")?.toString(),
            )}
            onSelectValue={(value) =>
              searchFilters.handleSearch({ category: value?.id })
            }
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
            onSelectValue={(value) =>
              searchFilters.handleSearch({ place: value?.id })
            }
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
            onSelectValue={(value) =>
              searchFilters.handleSearch({ wallet: value?.id })
            }
            options={props.wallets}
            optionFormatter={(wallet) => wallet.name}
            withSearch
          />
        </div>
      </div>
    </div>
  );
}
