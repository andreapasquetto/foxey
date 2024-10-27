"use client";

import { thisMonthToDateRange } from "@/common/dates";
import { RangeDatePicker } from "@/components/range-date-picker";
import { AddTransaction } from "@/modules/accounting/components/add-transaction";
import { TransactionList } from "@/modules/accounting/components/transaction-list";
import { WalletSwitcher } from "@/modules/accounting/components/wallet-switcher";
import { WalletRead } from "@/modules/accounting/schemas/wallet-read-schema";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export function Transactions() {
  const [selectedWallet, setSelectedWallet] = useState<WalletRead | undefined>(undefined);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(thisMonthToDateRange());

  return (
    <>
      <div className="flex items-center justify-end gap-3">
        <RangeDatePicker dateRange={dateRange} setDateRange={setDateRange} showPresets />
        <WalletSwitcher selectedWallet={selectedWallet} onSelectWallet={setSelectedWallet} />
        <AddTransaction selectedWallet={selectedWallet} />
      </div>
      <TransactionList walletId={selectedWallet?.id} dateRange={dateRange} />
    </>
  );
}
