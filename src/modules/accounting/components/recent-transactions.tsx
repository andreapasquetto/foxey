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
  walletId: string;
}

function _renderType({ tx, currentWalletId }: { tx: Transaction; currentWalletId: string }) {
  return tx.type === "transfer" ? (
    <div className="">
      <div>transfer</div>
      <div className="space-x-2 text-sm text-muted-foreground">
        <span>{mockedWallets.find((wallet) => wallet.id === tx.from)?.name}</span>
        <ChevronsRight
          className={cn(
            "inline-block h-5 w-5",
            currentWalletId === tx.from
              ? "text-red-500 dark:text-red-400"
              : "text-green-500 dark:text-green-400",
          )}
        />
        <span>{mockedWallets.find((wallet) => wallet.id === tx.to)?.name}</span>
      </div>
    </div>
  ) : (
    tx.type
  );
}

function _renderCategory(tx: Transaction) {
  return tx.categories ? (
    <div>
      {tx.categories.primary}
      <div className="text-xs text-muted-foreground">{tx.categories.secondary}</div>
    </div>
  ) : (
    "-"
  );
}

function _renderAmount(tx: Transaction) {
  return (
    <code
      className={cn({
        "text-green-500 dark:text-green-400": tx.type === "incoming",
        "text-red-500 dark:text-red-400": tx.type === "outgoing",
        "text-muted-foreground": tx.type === "transfer",
      })}
    >
      {rawCurrencyFormatter.format(tx.amount)}
    </code>
  );
}

export function RecentTransactions(props: RecentTransactionsProps) {
  const selectedWalletTransactions = mockedTransactions.filter(
    (transaction) => transaction.from === props.walletId || transaction.to === props.walletId,
  );

  if (!selectedWalletTransactions.length)
    return (
      <div className="my-6">
        <p className="text-center text-sm text-muted-foreground">
          No transaction found for the selected wallet.
        </p>
      </div>
    );

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
        {selectedWalletTransactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.datetime}</TableCell>
            <TableCell>
              {_renderType({ tx: transaction, currentWalletId: props.walletId })}
            </TableCell>
            <TableCell>{_renderCategory(transaction)}</TableCell>
            <TableCell>{transaction.description ?? "-"}</TableCell>
            <TableCell className="text-right">{_renderAmount(transaction)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
