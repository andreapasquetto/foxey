"use client";

import { rawCurrencyFormatter } from "@/common/formatters";
import { walletRoute } from "@/common/routes";
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
import { useWalletsGetAllQuery } from "@/modules/accounting/accounting-queries";
import { format } from "date-fns";
import { Edit, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export function WalletList() {
  const walletsQuery = useWalletsGetAllQuery();

  if (!walletsQuery.data) {
    return <ComponentSkeleton />;
  }

  const wallets = walletsQuery.data;

  if (!wallets.length) {
    return <ComponentEmptyState />;
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
                        href={walletRoute(wallet.id)}
                        className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
                      >
                        Edit <Edit className="h-5 w-5" />
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
        <Skeleton className="h-4 w-12" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20" />
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
      <p className="text-center text-sm text-muted-foreground">There are no wallets.</p>
    </div>
  );
}
