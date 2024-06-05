"use client";

import { Heading1 } from "@/components/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, mockedWallets } from "@/mocks/accounting";
import AccountingStats from "@/modules/accounting/components/accounting-stats";
import { AddTransaction } from "@/modules/accounting/components/add-transaction";
import { RecentTransactions } from "@/modules/accounting/components/recent-transactions";
import { TotalBalance } from "@/modules/accounting/components/total-balance";
import { WalletSwitcher } from "@/modules/accounting/components/wallet-switcher";
import { useState } from "react";

export default function AccountingPage() {
  const [selectedWallet, setSelectedWallet] = useState<Wallet>(mockedWallets[0]);

  return (
    <section>
      <Heading1>Accounting</Heading1>
      <TotalBalance />
      <div className="mt-3 flex items-center justify-between">
        <WalletSwitcher selectedWallet={selectedWallet} onSelectWallet={setSelectedWallet} />
        <div>
          <AddTransaction selectedWallet={selectedWallet} />
        </div>
      </div>
      <div className="mt-3 grid gap-3">
        <AccountingStats />
        <Card>
          <CardHeader>
            <CardTitle>Recent transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentTransactions walletId={selectedWallet.id} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}