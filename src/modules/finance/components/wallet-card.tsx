"use client";

import { currencyFormatter } from "@/common/formatters";
import { walletRoute } from "@/common/routes";
import { CopyToClipboardButton } from "@/components/copy-to-clipboard-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Wallet } from "@/db/types/finance";
import { cn } from "@/lib/utils";
import { Edit, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { UnarchiveWallet } from "./dialogs/unarchive-wallet";
import { ArchiveWallet } from "./dialogs/archive-wallet";

export function WalletCard({ wallet }: { wallet: Wallet }) {
  return (
    <Card key={wallet.id} className="relative">
      <div className="absolute top-2 right-2 flex items-center gap-1">
        {wallet.isArchived && <Badge variant="secondary">Archived</Badge>}
        <CopyToClipboardButton content={wallet.id} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[250px]">
            <DropdownMenuItem asChild>
              {wallet.isArchived ? (
                <UnarchiveWallet wallet={wallet} />
              ) : (
                <ArchiveWallet wallet={wallet} />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={walletRoute(wallet.id)}
                className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
                prefetch
              >
                Edit <Edit className="size-5" />
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CardHeader>
        <CardTitle className={cn(wallet.isArchived && "text-muted-foreground")}>
          {wallet.name}
        </CardTitle>
        <CardDescription>
          <code>{currencyFormatter.format(parseFloat(wallet.amount))}</code>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
