import { rawCurrencyFormatter } from "@/common/formatters";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Transaction, mockedTransactions, mockedWallets } from "@/mocks/accounting";
import { ChevronsRight } from "lucide-react";

interface RecentTransactionsProps {
  walletId: string | undefined;
}

function _renderType(tx: Transaction, selectedWalletId: string | undefined) {
  function _renderDirection() {
    if (tx.from && !tx.to) return <div>outgoing</div>;
    if (!tx.from && tx.to) return <div>incoming</div>;
    if (tx.from && tx.to) return <div>transfer</div>;
  }

  return (
    <div>
      {_renderDirection()}
      <div className="space-x-2 text-sm text-muted-foreground">
        {tx.from && <span>{mockedWallets.find((wallet) => wallet.id === tx.from)?.name}</span>}
        {tx.from && tx.to && (
          <ChevronsRight
            className={cn("inline-block h-5 w-5", {
              "text-red-500 dark:text-red-400": selectedWalletId === tx.from,
              "text-green-500 dark:text-green-400": selectedWalletId === tx.to,
            })}
          />
        )}
        {tx.to && <span>{mockedWallets.find((wallet) => wallet.id === tx.to)?.name}</span>}
      </div>
    </div>
  );
}

export function RecentTransactions(props: RecentTransactionsProps) {
  const filteredTransactions = props.walletId
    ? mockedTransactions.filter(
        (transaction) => transaction.from === props.walletId || transaction.to === props.walletId,
      )
    : mockedTransactions;

  if (!filteredTransactions.length && props.walletId) {
    return (
      <div className="my-6">
        <p className="text-center text-sm text-muted-foreground">
          No transactions found for the selected wallet.
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
            <TableCell>{_renderType(tx, props.walletId)}</TableCell>
            <TableCell>
              {tx.categories ? (
                <div>
                  {tx.categories.primary}
                  <div className="text-xs text-muted-foreground">{tx.categories.secondary}</div>
                </div>
              ) : (
                "-"
              )}
            </TableCell>
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
                  {rawCurrencyFormatter.format(tx.amount)}
                </code>
              }
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
