import { rawCurrencyFormatter } from "@/common/formatters";
import { QueryPagination } from "@/components/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useTransactionsGetPaginatedQuery } from "@/modules/accounting/accounting-queries";
import { DeleteTransaction } from "@/modules/accounting/components/delete-transaction";
import { format } from "date-fns";
import { ChevronsRight, Edit, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { DateRange } from "react-day-picker";

interface RecentTransactionsProps {
  walletId?: string;
  dateRange?: DateRange;
  searchFilter?: string;
}

export function TransactionList(props: RecentTransactionsProps) {
  const transactionsQuery = useTransactionsGetPaginatedQuery({
    walletId: props.walletId,
    dateRange: props.dateRange,
    searchFilter: props.searchFilter,
  });

  if (!transactionsQuery.data) {
    return (
      <Table>
        <TableHeader>
          <TableHeaderRow />
        </TableHeader>
        <TableBody>
          <TableRowsSkeleton />
        </TableBody>
      </Table>
    );
  }

  const transactions = transactionsQuery.data.records;

  if (!transactions.length) {
    return (
      <div className="my-6">
        <p className="text-center text-sm text-muted-foreground">
          {props.walletId && "No transactions found for the selected wallet."}
          {!props.walletId && "There are no transactions."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableHeaderRow />
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>
                <code>{format(tx.datetime, "ccc y-MM-dd HH:mm")}</code>
              </TableCell>
              <TableCell>
                <div>
                  <div className="space-x-2 text-sm text-muted-foreground">
                    {tx.fromWallet && <span>{tx.fromWallet.name}</span>}
                    {tx.fromWallet && tx.toWallet && (
                      <ChevronsRight
                        className={cn("inline-block h-5 w-5", {
                          "text-red-500 dark:text-red-400": props.walletId === tx.fromWallet.id,
                          "text-green-500 dark:text-green-400": props.walletId === tx.toWallet.id,
                        })}
                      />
                    )}
                    {tx.toWallet && <span>{tx.toWallet.name}</span>}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div>{tx.category?.name}</div>
                  {tx.category?.parent && (
                    <div className="space-x-2 text-sm text-muted-foreground">
                      <span>{tx.category.parent.name}</span>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div>{tx.place?.name}</div>
                  {tx.place?.category && (
                    <div className="space-x-2 text-sm text-muted-foreground">
                      <span>{tx.place.category.name}</span>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {tx.tags.map((tag) => (
                    <Badge key={tag.id}>{tag.name}</Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{tx.description}</TableCell>
              <TableCell className="text-right">
                {
                  <code
                    className={cn({
                      "text-green-500 dark:text-green-400": tx.toWallet && !tx.fromWallet,
                      "text-red-500 dark:text-red-400": tx.fromWallet && !tx.toWallet,
                      "text-muted-foreground": tx.fromWallet && tx.toWallet,
                    })}
                  >
                    {rawCurrencyFormatter.format(parseFloat(tx.amount))}
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
                        href={`/accounting/transactions/${tx.id}`}
                        className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
                      >
                        Edit <Edit className="h-5 w-5" />
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <DeleteTransaction transaction={tx} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <QueryPagination query={transactionsQuery} />
    </div>
  );
}

function TableHeaderRow() {
  return (
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
  );
}

function TableRowsSkeleton() {
  return Array.from({ length: 3 }).map((_, i) => (
    <TableRow key={i}>
      <TableCell>
        <Skeleton className="h-4 w-44" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-40" />
      </TableCell>
      <TableCell>
        <Skeleton className="ml-auto h-4 w-12" />
      </TableCell>
      <TableCell>
        <Skeleton className="ml-auto h-9 w-11" />
      </TableCell>
    </TableRow>
  ));
}
