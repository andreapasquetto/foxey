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
import { DeleteTransaction } from "@/modules/accounting/components/delete-transaction";
import { formatISO } from "date-fns";
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
        (transaction) =>
          transaction.fromWalletId === props.walletId || transaction.toWalletId === props.walletId,
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
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredTransactions.map((tx) => (
          <TableRow key={tx.id}>
            <TableCell>{formatISO(tx.date, { representation: "date" })}</TableCell>
            <TableCell>
              <div>
                {tx.fromWalletId && !tx.toWalletId && <div>outgoing</div>}
                {!tx.fromWalletId && tx.toWalletId && <div>incoming</div>}
                {tx.fromWalletId && tx.toWalletId && <div>transfer</div>}
                <div className="space-x-2 text-sm text-muted-foreground">
                  {tx.fromWalletId && (
                    <span>{wallets.find((wallet) => wallet.id === tx.fromWalletId)?.name}</span>
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
                    <span>{wallets.find((wallet) => wallet.id === tx.toWalletId)?.name}</span>
                  )}
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
  );
}
