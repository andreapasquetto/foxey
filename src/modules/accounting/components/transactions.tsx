"use client";

import { thisMonthToDateRange } from "@/common/dates";
import { RangeDatePicker } from "@/components/range-date-picker";
import { Button } from "@/components/ui/button";
import { TransactionList } from "@/modules/accounting/components/transaction-list";
import { WalletSwitcher } from "@/modules/accounting/components/wallet-switcher";
import { WalletRead } from "@/modules/accounting/schemas/wallet-read-schema";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export function Transactions() {
  const router = useRouter();

  const [selectedWallet, setSelectedWallet] = useState<WalletRead | undefined>(undefined);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(thisMonthToDateRange());

  function redirectToTransactionCreatePage() {
    router.push("/accounting/transactions/new");
  }

  return (
    <>
      <div className="flex items-center justify-end gap-3">
        <RangeDatePicker dateRange={dateRange} setDateRange={setDateRange} showPresets />
        <WalletSwitcher selectedWallet={selectedWallet} onSelectWallet={setSelectedWallet} />
        <Button
          className="hidden sm:inline-flex"
          size="sm"
          onClick={() => redirectToTransactionCreatePage()}
        >
          Add transaction
        </Button>
        <Button className="sm:hidden" size="icon" onClick={() => redirectToTransactionCreatePage()}>
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      <TransactionList walletId={selectedWallet?.id} dateRange={dateRange} />
    </>
  );
}
