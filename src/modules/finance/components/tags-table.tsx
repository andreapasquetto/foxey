import { MoreHorizontal } from "lucide-react";
import { currencyFormatter } from "@/common/formatters";
import { CopyToClipboardButton } from "@/components/copy-to-clipboard-button";
import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
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
import { tagsGetAll } from "@/modules/finance/finance-actions";
import {
  calculateTotal,
  getIncomingTransactions,
  getOutgoingTransactions,
  getTransactionsWithoutTransfers,
} from "@/modules/finance/finance-utils";

export async function TagsTable() {
  const tags = await tagsGetAll();

  if (!tags.length) {
    return <EmptyStateMessage message="There are no tags." />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tag</TableHead>
          <TableHead className="text-right">
            Total <code>+</code>
          </TableHead>
          <TableHead className="text-right">
            Total <code>-</code>
          </TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tags.map((tag) => {
          const transactions = getTransactionsWithoutTransfers(
            tag.transactionTags.map((it) => it.transaction as Transaction),
          );
          return (
            <TableRow key={tag.id}>
              <TableCell>
                <Badge>{tag.name}</Badge>
              </TableCell>
              <TableCell className="text-right text-green-500 dark:text-green-400">
                <code>
                  {currencyFormatter.format(
                    calculateTotal(
                      getIncomingTransactions(transactions),
                    ).toNumber(),
                  )}
                </code>
              </TableCell>
              <TableCell className="text-right text-red-500 dark:text-red-400">
                <code>
                  {currencyFormatter.format(
                    calculateTotal(
                      getOutgoingTransactions(transactions),
                    ).toNumber(),
                  )}
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
                      <CopyToClipboardButton content={tag.id} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
