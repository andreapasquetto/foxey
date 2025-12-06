import { formatDistanceToNow } from "date-fns";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { rawCurrencyFormatter } from "@/common/formatters";
import { transactionsRoute } from "@/common/routes";
import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { transactionsGetLatest } from "@/modules/finance/finance-actions";

export async function LatestTransactions() {
  const transactions = await transactionsGetLatest();

  if (!transactions.length) {
    return <EmptyStateMessage message="There are no transactions." />;
  }

  return (
    <div className="space-y-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>When</TableHead>
            <TableHead>Summary</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                {formatDistanceToNow(transaction.datetime, { addSuffix: true })}
              </TableCell>
              <TableCell>
                {transaction.category && <p>{transaction.category.name}</p>}
                {transaction.description && (
                  <p className="text-xs text-muted-foreground">
                    {transaction.description}
                  </p>
                )}
              </TableCell>
              <TableCell className="text-right">
                {
                  <code
                    className={cn({
                      "text-green-500 dark:text-green-400":
                        transaction.to && !transaction.from,
                      "text-red-500 dark:text-red-400":
                        transaction.from && !transaction.to,
                      "text-muted-foreground":
                        transaction.from && transaction.to,
                    })}
                  >
                    {rawCurrencyFormatter.format(
                      parseFloat(transaction.amount),
                    )}
                  </code>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end">
        <Button variant="link" asChild>
          <Link href={transactionsRoute}>
            See all
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
