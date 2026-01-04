"use client";

import { format } from "date-fns";
import { ChevronsRight, MoreHorizontal, SquarePen } from "lucide-react";
import Link from "next/link";
import { rawCurrencyFormatter } from "@/common/formatters";
import { usePagination } from "@/common/hooks/use-pagination";
import { placeRoute, transactionRoute, walletRoute } from "@/common/routes";
import { CopyToClipboardButton } from "@/components/copy-to-clipboard-button";
import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
import { Pagination } from "@/components/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Transaction } from "@/db/types/finance";
import { cn } from "@/lib/utils";
import { DeleteTransaction } from "@/modules/finance/components/dialogs/delete-transaction";

export function TransactionsList({
  transactions,
  total,
}: {
  transactions: Transaction[];
  total: number;
}) {
  const pagination = usePagination(total);

  if (!transactions.length) {
    return <EmptyStateMessage message="There are no transactions." />;
  }

  return (
    <div className="space-y-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Wallet</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Place</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                <code>{format(transaction.datetime, "ccc y-MM-dd HH:mm")}</code>
              </TableCell>
              <TableCell className="space-x-1 text-sm text-muted-foreground">
                {transaction.from && (
                  <Link
                    href={walletRoute(transaction.from.id)}
                    target="_blank"
                    className="hover:text-foreground hover:underline"
                  >
                    {transaction.from.name}
                  </Link>
                )}
                {transaction.from && transaction.to && (
                  <ChevronsRight className="inline-block size-5" />
                )}
                {transaction.to && (
                  <Link
                    href={walletRoute(transaction.to.id)}
                    target="_blank"
                    className="hover:text-foreground hover:underline"
                  >
                    {transaction.to.name}
                  </Link>
                )}
              </TableCell>
              <TableCell>{transaction.category?.name}</TableCell>
              <TableCell className="group">
                {transaction.place && (
                  <Link href={placeRoute(transaction.place.id)} target="_blank">
                    <div className="group-hover:underline">
                      {transaction.place.name}
                    </div>
                    {transaction.place.category && (
                      <div className="space-x-2 text-sm text-muted-foreground group-hover:underline">
                        <span>{transaction.place.category.name}</span>
                      </div>
                    )}
                  </Link>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {transaction.tags.map((tag) => (
                    <Badge key={tag.tagId}>{tag.tag.name}</Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell className="text-right">
                <code
                  className={cn({
                    "text-green-500 dark:text-green-400":
                      transaction.to && !transaction.from,
                    "text-red-500 dark:text-red-400":
                      transaction.from && !transaction.to,
                    "text-muted-foreground": transaction.from && transaction.to,
                  })}
                >
                  {rawCurrencyFormatter.format(parseFloat(transaction.amount))}
                </code>
              </TableCell>
              <TableCell className="flex items-center justify-end gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="size-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[250px]">
                    <DropdownMenuItem asChild>
                      <CopyToClipboardButton content={transaction.id} />
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Button
                        variant="ghost"
                        className="w-full cursor-pointer items-center justify-between"
                        asChild
                      >
                        <Link href={transactionRoute(transaction.id)} prefetch>
                          Edit <SquarePen className="text-current" />
                        </Link>
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <DeleteTransaction transaction={transaction} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination {...pagination} />
    </div>
  );
}
