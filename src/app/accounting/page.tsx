"use client";

import { Heading1 } from "@/components/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AccountingStats from "@/modules/accounting/components/accounting-stats";
import { AddTransaction } from "@/modules/accounting/components/add-transaction";
import { TotalBalance } from "@/modules/accounting/components/total-balance";
import { TransactionList } from "@/modules/accounting/components/transaction-list";
import { WalletSwitcher } from "@/modules/accounting/components/wallet-switcher";
import { WalletRead } from "@/modules/accounting/schemas/wallet-read-schema";
import { useState } from "react";

export default function AccountingPage() {
  const [selectedWallet, setSelectedWallet] = useState<WalletRead | undefined>(undefined);

  return (
    <section>
      <div className="flex items-center justify-between">
        <Heading1>Accounting</Heading1>
      </div>
      <TotalBalance />
      <div className="mt-3 space-y-3">
        <AccountingStats />
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Transactions</CardTitle>
              <div className="hidden md:block">
                <WalletSwitcher
                  selectedWallet={selectedWallet}
                  onSelectWallet={setSelectedWallet}
                />
              </div>
              <AddTransaction selectedWallet={selectedWallet} />
            </div>
          </CardHeader>
          <CardContent>
            <TransactionList walletId={selectedWallet?.id} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
