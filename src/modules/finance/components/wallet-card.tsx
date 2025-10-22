"use client";

import { currencyFormatter } from "@/common/formatters";
import { walletRoute } from "@/common/routes";
import { CopyToClipboardButton } from "@/components/copy-to-clipboard-button";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "@/db/types/finance";
import { Edit } from "lucide-react";
import Link from "next/link";

export function WalletCard({ wallet }: { wallet: Wallet }) {
  return (
    <Card key={wallet.id} className="relative">
      <div className="absolute top-2 right-2 flex items-center gap-1">
        <CopyToClipboardButton content={wallet.id} />
        <Button variant="ghost" size="icon" asChild>
          <Link href={walletRoute(wallet.id)} prefetch>
            <Edit className="size-5" />
          </Link>
        </Button>
      </div>
      <CardHeader>
        <CardTitle>{wallet.name}</CardTitle>
        <CardDescription>
          <code>{currencyFormatter.format(parseFloat(wallet.amount))}</code>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
