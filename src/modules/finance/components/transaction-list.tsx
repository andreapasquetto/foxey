import { rawCurrencyFormatter } from "@/common/formatters";
import { transactionRoute } from "@/common/routes";
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
import { Transaction } from "@/db/types/finance";
import { cn } from "@/lib/utils";
import { DeleteTransaction } from "@/modules/finance/components/dialogs/delete-transaction";
import { format } from "date-fns";
import { ChevronsRight, Edit, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export async function TransactionList(props: { transactions: Transaction[] }) {
  const { transactions } = props;

  if (!transactions.length) {
    return <EmptyStateMessage message="There are no transactions." />;
  }

  return (
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
        {transactions
          .toReversed()
          .slice(0, 10)
          .map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                <code>{format(transaction.datetime, "ccc y-MM-dd HH:mm")}</code>
              </TableCell>
              <TableCell>
                <div>
                  <div className="space-x-2 text-sm text-muted-foreground">
                    {transaction.from && <span>{transaction.from.name}</span>}
                    {transaction.from && transaction.to && (
                      <ChevronsRight className="inline-block h-5 w-5" />
                    )}
                    {transaction.to && <span>{transaction.to.name}</span>}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div>{transaction.category?.name}</div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div>{transaction.place?.name}</div>
                  {transaction.place?.category && (
                    <div className="space-x-2 text-sm text-muted-foreground">
                      <span>{transaction.place.category.name}</span>
                    </div>
                  )}
                </div>
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
                {
                  <code
                    className={cn({
                      "text-green-500 dark:text-green-400": transaction.to && !transaction.from,
                      "text-red-500 dark:text-red-400": transaction.from && !transaction.to,
                      "text-muted-foreground": transaction.from && transaction.to,
                    })}
                  >
                    {rawCurrencyFormatter.format(parseFloat(transaction.amount))}
                  </code>
                }
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[250px]">
                    <DropdownMenuItem asChild>
                      <Link
                        href={transactionRoute(transaction.id)}
                        className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
                        prefetch
                      >
                        Edit <Edit className="h-5 w-5" />
                      </Link>
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
  );
}
