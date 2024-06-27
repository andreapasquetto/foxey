import { rawCurrencyFormatter } from "@/common/formatters";
import { CircularSpinner } from "@/components/circular-spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useTransactionsQuery, useWalletsQuery } from "@/modules/accounting/accounting-queries";
import { ChevronsRight } from "lucide-react";

interface RecentTransactionsProps {
  walletId: string | undefined;
}

export function RecentTransactions(props: RecentTransactionsProps) {
  const { data: wallets, isFetching: isFetchingWallets } = useWalletsQuery();
  const { data: transactions, isFetching: isFetchinTransactions } = useTransactionsQuery();

  if (!wallets || isFetchingWallets || !transactions || isFetchinTransactions) {
    return <CircularSpinner className="mx-auto" />;
  }

  const filteredTransactions = props.walletId
    ? transactions.filter(
        (transaction) => transaction.from === props.walletId || transaction.to === props.walletId,
      )
    : transactions;

  if (!filteredTransactions.length) {
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredTransactions.map((tx) => (
          <TableRow key={tx.id}>
            <TableCell>{tx.datetime}</TableCell>
            <TableCell>
              <div>
                {tx.from && !tx.to && <div>outgoing</div>}
                {!tx.from && tx.to && <div>incoming</div>}
                {tx.from && tx.to && <div>transfer</div>}
                <div className="space-x-2 text-sm text-muted-foreground">
                  {tx.from && <span>{wallets.find((wallet) => wallet.id === tx.from)?.name}</span>}
                  {tx.from && tx.to && (
                    <ChevronsRight
                      className={cn("inline-block h-5 w-5", {
                        "text-red-500 dark:text-red-400": props.walletId === tx.from,
                        "text-green-500 dark:text-green-400": props.walletId === tx.to,
                      })}
                    />
                  )}
                  {tx.to && <span>{wallets.find((wallet) => wallet.id === tx.to)?.name}</span>}
                </div>
              </div>
            </TableCell>
            <TableCell>{tx.category}</TableCell>
            <TableCell>{tx.description ?? "-"}</TableCell>
            <TableCell className="text-right">
              {
                <code
                  className={cn({
                    "text-green-500 dark:text-green-400": tx.to && !tx.from,
                    "text-red-500 dark:text-red-400": tx.from && !tx.to,
                    "text-muted-foreground": tx.from && tx.to,
                  })}
                >
                  {rawCurrencyFormatter.format(parseFloat(tx.amount))}
                </code>
              }
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
