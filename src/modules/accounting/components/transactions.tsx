"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddTransaction } from "@/modules/accounting/components/add-transaction";
import { TransactionList } from "@/modules/accounting/components/transaction-list";
import { WalletSwitcher } from "@/modules/accounting/components/wallet-switcher";
import { WalletRead } from "@/modules/accounting/schemas/wallet-read-schema";
import { useState } from "react";

export function Transactions() {
  const [selectedWallet, setSelectedWallet] = useState<WalletRead | undefined>(undefined);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Transactions</CardTitle>
          <div className="hidden md:block">
            <WalletSwitcher selectedWallet={selectedWallet} onSelectWallet={setSelectedWallet} />
          </div>
          <AddTransaction selectedWallet={selectedWallet} />
        </div>
      </CardHeader>
      <CardContent>
        <TransactionList walletId={selectedWallet?.id} />
      </CardContent>
    </Card>
  );
}
