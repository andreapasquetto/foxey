"use client";

import { thisMonthToDateRange } from "@/common/dates";
import { RangeDatePicker } from "@/components/range-date-picker";
import { Input } from "@/components/ui/input";
import { TransactionList } from "@/modules/accounting/components/transaction-list";
import { TransactionCategoryRead } from "@/modules/accounting/schemas/transaction-category-read-schema";
import { WalletRead } from "@/modules/accounting/schemas/wallet-read-schema";
import { PlaceRead } from "@/modules/places/schemas/place-read-schema";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export function Transactions() {
  // TODO: add some sort of debounce when updating the search filter
  const [searchFilter, setSearchFilter] = useState<string>("");

  const [dateRange, setDateRange] = useState<DateRange | undefined>(thisMonthToDateRange());
  const [selectedWallet, setSelectedWallet] = useState<WalletRead | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<TransactionCategoryRead | undefined>(
    undefined,
  );
  const [selectedPlace, setSelectedPlace] = useState<PlaceRead | undefined>(undefined);

  return (
    <>
      <div className="gap-3 space-y-3 lg:grid lg:grid-cols-7 lg:space-y-0">
        <div className="sm:col-span-full lg:col-span-5">
          <Input
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search..."
          />
        </div>
        <div className="sm:col-span-1 lg:col-span-2">
          <RangeDatePicker dateRange={dateRange} setDateRange={setDateRange} showPresets />
        </div>
        {/* TODO: add wallet, place and category filters */}
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
