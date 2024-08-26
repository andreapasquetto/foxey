"use client";

import { RangeDatePicker } from "@/components/range-date-picker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddTransaction } from "@/modules/accounting/components/add-transaction";
import { ExpensesChart } from "@/modules/accounting/components/charts/expenses-chart";
import { TrendChart } from "@/modules/accounting/components/charts/trend-chart";
import { TransactionList } from "@/modules/accounting/components/transaction-list";
import { WalletSwitcher } from "@/modules/accounting/components/wallet-switcher";
import { WalletRead } from "@/modules/accounting/schemas/wallet-read-schema";
import { endOfDay, startOfMonth, startOfToday } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export function Transactions() {
  const [selectedWallet, setSelectedWallet] = useState<WalletRead | undefined>(undefined);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfMonth(startOfToday()),
    to: endOfDay(startOfToday()),
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Transactions</CardTitle>
          <div className="flex items-center gap-3">
            <RangeDatePicker dateRange={dateRange} setDateRange={setDateRange} showPresets />
            <WalletSwitcher selectedWallet={selectedWallet} onSelectWallet={setSelectedWallet} />
            <AddTransaction selectedWallet={selectedWallet} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="pb-12">
          <Accordion type="single" collapsible>
            <AccordionItem value="trend-chart">
              <AccordionTrigger>Charts</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-2">
                  <TrendChart walletId={selectedWallet?.id} dateRange={dateRange} />
                  <ExpensesChart walletId={selectedWallet?.id} dateRange={dateRange} />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <TransactionList walletId={selectedWallet?.id} dateRange={dateRange} />
      </CardContent>
    </Card>
  );
}
