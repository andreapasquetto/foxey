import { rawCurrencyFormatter } from "@/common/formatters";
import { QueryPagination } from "@/components/pagination";
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
import {
  useTransactionCategoriesQuery,
  useTransactionsPaginatedQuery,
  useWalletsQuery,
} from "@/modules/accounting/accounting-queries";
import { DeleteTransaction } from "@/modules/accounting/components/delete-transaction";
import { format } from "date-fns";
import { ChevronsRight } from "lucide-react";
import { DateRange } from "react-day-picker";

interface RecentTransactionsProps {
  walletId?: string;
  dateRange?: DateRange;
}

export function TransactionList(props: RecentTransactionsProps) {
  const walletsQuery = useWalletsQuery();
  const categoriesQuery = useTransactionCategoriesQuery();
  const transactionsQuery = useTransactionsPaginatedQuery({
    walletId: props.walletId,
    dateRange: props.dateRange,
  });

  const hasData = walletsQuery.data && categoriesQuery.data && transactionsQuery.data;

  if (!hasData) {
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
          {!hasData && <TableRowsSkeleton />}
          {hasData &&
            transactionsQuery.data.records.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>{format(tx.date, "ccc dd MMM y")}</TableCell>
                <TableCell>
                  <div>
                    {tx.fromWalletId && !tx.toWalletId && <div>outgoing</div>}
                    {!tx.fromWalletId && tx.toWalletId && <div>incoming</div>}
                    {tx.fromWalletId && tx.toWalletId && <div>transfer</div>}
                    <div className="space-x-2 text-sm text-muted-foreground">
                      {tx.fromWalletId && (
                        <span>
                          {walletsQuery.data.find((wallet) => wallet.id === tx.fromWalletId)?.name}
                        </span>
                      )}
                      {tx.fromWalletId && tx.toWalletId && (
                        <ChevronsRight
                          className={cn("inline-block h-5 w-5", {
                            "text-red-500 dark:text-red-400": props.walletId === tx.fromWalletId,
                            "text-green-500 dark:text-green-400": props.walletId === tx.toWalletId,
                          })}
                        />
                      )}
                      {tx.toWalletId && (
                        <span>
                          {walletsQuery.data.find((wallet) => wallet.id === tx.toWalletId)?.name}
                        </span>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div>
                      {categoriesQuery.data.find((category) => category.id === tx.categoryId)
                        ?.name ?? "-"}
                    </div>
                    <div className="space-x-2 text-sm text-muted-foreground">
                      <span>
                        {
                          categoriesQuery.data.find((category) => category.id === tx.categoryId)
                            ?.parent?.name
                        }
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{tx.description ?? "-"}</TableCell>
                <TableCell className="text-right">
                  {
                    <code
                      className={cn({
                        "text-green-500 dark:text-green-400": tx.toWalletId && !tx.fromWalletId,
                        "text-red-500 dark:text-red-400": tx.fromWalletId && !tx.toWalletId,
                        "text-muted-foreground": tx.fromWalletId && tx.toWalletId,
                      })}
                    >
                      {rawCurrencyFormatter.format(parseFloat(tx.amount))}
                    </code>
                  }
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end">
                    <DeleteTransaction transaction={tx} />
                  </div>
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
      <TableHead>Type</TableHead>
      <TableHead>Category</TableHead>
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
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-60" />
      </TableCell>
      <TableCell>
        <Skeleton className="ml-auto h-4 w-20" />
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-end">
          <Skeleton className="aspect-square h-10" />
        </div>
      </TableCell>
    </TableRow>
  ));
}
