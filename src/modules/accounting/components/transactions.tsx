"use client";

import { thisMonthToDateRange } from "@/common/dates";
import { IdNameParent } from "@/common/types";
import { ChipCombobox } from "@/components/form/chip-combobox";
import { RangeDatePicker } from "@/components/form/range-date-picker";
import { Input } from "@/components/ui/input";
import {
  useTransactionCategoriesGetAllQuery,
  useWalletsGetAllQuery,
} from "@/modules/accounting/accounting-queries";
import { TransactionList } from "@/modules/accounting/components/transaction-list";
import { WalletRead } from "@/modules/accounting/schemas/wallet-read-schema";
import { usePlacesGetAllQuery } from "@/modules/places/places-queries";
import { PlaceRead } from "@/modules/places/schemas/place-read-schema";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export function Transactions() {
  // TODO: add some sort of debounce when updating the search filter
  const [searchFilter, setSearchFilter] = useState<string>("");

  const [dateRange, setDateRange] = useState<DateRange | undefined>(thisMonthToDateRange());
  const [selectedWallet, setSelectedWallet] = useState<WalletRead | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<IdNameParent | undefined>(undefined);
  const [selectedPlace, setSelectedPlace] = useState<PlaceRead | undefined>(undefined);

  const walletsQuery = useWalletsGetAllQuery();
  const placesQuery = usePlacesGetAllQuery();
  const categoriesQuery = useTransactionCategoriesGetAllQuery();

  return (
    <>
      <div className="flex-wrap items-center gap-3 space-y-3 sm:flex sm:space-y-0">
        <div className="shrink-0 sm:w-[250px]">
          <Input
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search..."
          />
        </div>
        <div>
          <RangeDatePicker dateRange={dateRange} setDateRange={setDateRange} showPresets />
        </div>
        <div className="flex flex-wrap items-center gap-1 space-y-0">
          <div>
            <ChipCombobox
              label="Wallet"
              selectedValue={selectedWallet}
              onSelectValue={setSelectedWallet}
              options={walletsQuery.data}
              optionIndexer={(option) => option.name}
              optionFormatter={(option) => option.name}
            />
          </div>
          <div>
            <ChipCombobox
              label="Place"
              selectedValue={selectedPlace}
              onSelectValue={setSelectedPlace}
              options={placesQuery.data}
              optionIndexer={(option) =>
                option.category ? `${option.category.name}-${option.name}` : option.name
              }
              optionFormatter={(option) => option.name}
              withSearch
            />
          </div>
          <div>
            <ChipCombobox
              label="Category"
              selectedValue={selectedCategory}
              onSelectValue={setSelectedCategory}
              options={categoriesQuery.data}
              optionIndexer={(option) =>
                option.parent ? `${option.parent.name}-${option.name}` : option.name
              }
              optionFormatter={(option) => (
                <>
                  {!option.parent && <div>{option.name}</div>}
                  {option.parent && (
                    <div>
                      <span className="text-muted-foreground">{option.parent.name}</span>
                      <span className="mx-1">•</span>
                      <span>{option.name}</span>
                    </div>
                  )}
                </>
              )}
              withSearch
            />
          </div>
        </div>
      </div>
      <TransactionList
        searchFilter={searchFilter}
        dateRange={dateRange}
        walletId={selectedWallet?.id}
        placeId={selectedPlace?.id}
        categoryId={selectedCategory?.id}
      />
    </>
  );
}
