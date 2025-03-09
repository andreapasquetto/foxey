import { rawCurrencyFormatter } from "@/common/formatters";
import { transactionRoute } from "@/common/routes";
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
import { useTransactionsGetPaginatedQuery } from "@/modules/finance/finance-queries";
import { DeleteTransaction } from "@/modules/finance/components/dialogs/delete-transaction";
import { format } from "date-fns";
import { ChevronsRight, Edit, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { DateRange } from "react-day-picker";

interface RecentTransactionsProps {
  searchFilter?: string;
  dateRange?: DateRange;
  walletId?: string;
  placeId?: string;
  categoryId?: string;
}

export function TransactionList(props: RecentTransactionsProps) {
  const transactionsQuery = useTransactionsGetPaginatedQuery({
    searchFilter: props.searchFilter,
    dateRange: props.dateRange,
    walletId: props.walletId,
    placeId: props.placeId,
    categoryId: props.categoryId,
  });

  if (!transactionsQuery.data) {
    return <ComponentSkeleton />;
  }

  const transactions = transactionsQuery.data.records;

  if (!transactions.length) {
    return <ComponentEmptyState />;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableHeaderRow />
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                <code>{format(transaction.datetime, "ccc y-MM-dd HH:mm")}</code>
              </TableCell>
              <TableCell>
                <div>
                  <div className="space-x-2 text-sm text-muted-foreground">
                    {transaction.from && <span>{transaction.from.name}</span>}
                    {transaction.from && transaction.to && (
                      <ChevronsRight
                        className={cn("inline-block h-5 w-5", {
                          "text-red-500 dark:text-red-400": props.walletId === transaction.from.id,
                          "text-green-500 dark:text-green-400":
                            props.walletId === transaction.to.id,
                        })}
                      />
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

function ComponentSkeleton() {
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

function ComponentEmptyState() {
  return (
    <div className="my-6">
      <p className="text-center text-sm text-muted-foreground">There are no transactions.</p>
    </div>
  );
}
