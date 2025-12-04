"use client";

import { ArrowRightLeft, Edit, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { currencyFormatter } from "@/common/formatters";
import { transactionsRoute, walletRoute } from "@/common/routes";
import { CopyToClipboardButton } from "@/components/copy-to-clipboard-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import type { Wallet } from "@/db/types/finance";
import { cn } from "@/lib/utils";
import { ArchiveWallet } from "@/modules/finance/components/dialogs/archive-wallet";
import { UnarchiveWallet } from "@/modules/finance/components/dialogs/unarchive-wallet";

export function WalletCard({ wallet }: { wallet: Wallet }) {
  return (
    <Item key={wallet.id} variant="outline" className="relative">
      <div className="absolute top-2 right-2 flex items-center gap-1">
        {wallet.isArchived && <Badge variant="secondary">Archived</Badge>}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[250px]">
            <DropdownMenuItem asChild>
              <CopyToClipboardButton content={wallet.id} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                variant="ghost"
                className="w-full cursor-pointer items-center justify-between"
                asChild
              >
                <Link
                  href={`${transactionsRoute}?wallet=${wallet.id}`}
                  target="_blank"
                  prefetch
                >
                  See transactions <ArrowRightLeft className="text-current" />
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              {wallet.isArchived ? (
                <UnarchiveWallet wallet={wallet} />
              ) : (
                <ArchiveWallet wallet={wallet} />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                variant="ghost"
                className="w-full cursor-pointer items-center justify-between"
                asChild
              >
                <Link href={walletRoute(wallet.id)} prefetch>
                  Edit <Edit className="text-current" />
                </Link>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ItemContent>
        <ItemTitle className={cn(wallet.isArchived && "text-muted-foreground")}>
          {wallet.name}
        </ItemTitle>
        <ItemDescription>
          <code>{currencyFormatter.format(parseFloat(wallet.amount))}</code>
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}
