"use client";

import { thisMonthToDateRange } from "@/common/dates";
import { RangeDatePicker } from "@/components/range-date-picker";
import { Input } from "@/components/ui/input";
import { TransactionList } from "@/modules/accounting/components/transaction-list";
import { WalletSwitcher } from "@/modules/accounting/components/wallet-switcher";
import { WalletRead } from "@/modules/accounting/schemas/wallet-read-schema";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export function Transactions() {
  const [selectedWallet, setSelectedWallet] = useState<WalletRead | undefined>(undefined);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(thisMonthToDateRange());

  // TODO: add some sort of debounce when updating the search filter
  const [searchFilter, setSearchFilter] = useState<string>("");

  return (
    <>
      <div className="gap-3 space-y-3 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-7">
        <div className="sm:col-span-full lg:col-span-3">
          <Input
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search..."
          />
        </div>
        <div className="sm:col-span-1 lg:col-span-2">
          <RangeDatePicker dateRange={dateRange} setDateRange={setDateRange} showPresets />
        </div>
        <div className="sm:col-span-1 lg:col-span-2">
          <WalletSwitcher selectedWallet={selectedWallet} onSelectWallet={setSelectedWallet} />
        </div>
      </div>
      <TransactionList
        walletId={selectedWallet?.id}
        dateRange={dateRange}
        searchFilter={searchFilter}
      />
    </>
  );
}
