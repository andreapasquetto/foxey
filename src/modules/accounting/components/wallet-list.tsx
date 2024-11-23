"use client";

import { rawCurrencyFormatter } from "@/common/formatters";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useWalletsGetAllQuery } from "@/modules/accounting/accounting-queries";
import { format } from "date-fns";

export function WalletList() {
  const walletsQuery = useWalletsGetAllQuery();

  if (!walletsQuery.data) {
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

  const wallets = walletsQuery.data;

  if (!wallets.length) {
    return (
      <div className="my-6">
        <p className="text-center text-sm text-muted-foreground">There are no wallets.</p>
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
          {wallets.map((wallet) => (
            <TableRow key={wallet.id}>
              <TableCell>
                <code>{format(wallet.createdAt, "ccc y-MM-dd HH:mm")}</code>
              </TableCell>
              <TableCell>{wallet.name}</TableCell>
              <TableCell>
                <code>{rawCurrencyFormatter.format(parseFloat(wallet.initialAmount))}</code>
              </TableCell>
              <TableCell>
                <code>{rawCurrencyFormatter.format(parseFloat(wallet.amount))}</code>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function TableHeaderRow() {
  return (
    <TableRow>
      <TableHead>Creation date</TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Initial amount</TableHead>
      <TableHead>Current amount</TableHead>
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
        <Skeleton className="h-4 w-12" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
    </TableRow>
  ));
}
