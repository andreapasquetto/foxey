import { rawCurrencyFormatter } from "@/common/formatters";
import { transactionsRoute } from "@/common/routes";
import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
import { Badge } from "@/components/ui/badge";
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
import { format } from "date-fns";
import { ArrowRight, ChevronsRight } from "lucide-react";
import Link from "next/link";

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
            <TableHead>Date</TableHead>
            <TableHead>Wallet</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Place</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
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
                      <ChevronsRight className="inline-block size-5" />
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end">
        <Button variant="link" asChild>
          <Link href={transactionsRoute}>
            See all
            <ArrowRight className="size-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
