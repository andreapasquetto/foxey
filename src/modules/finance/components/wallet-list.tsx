import { rawCurrencyFormatter } from "@/common/formatters";
import { walletRoute } from "@/common/routes";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { walletsGetAll } from "@/modules/finance/finance-actions";
import { format } from "date-fns";
import { Edit } from "lucide-react";
import Link from "next/link";

export async function WalletList() {
  const wallets = await walletsGetAll();

  if (!wallets.length) {
    return <ComponentEmptyState />;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Creation date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Initial amount</TableHead>
            <TableHead>Current amount</TableHead>
            <TableHead></TableHead>
          </TableRow>
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
                <Button variant="ghost" size="sm" asChild>
                  <Link href={walletRoute(wallet.id)} prefetch>
                    <Edit className="h-5 w-5" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ComponentEmptyState() {
  return (
    <div className="my-6">
      <p className="text-center text-sm text-muted-foreground">There are no wallets.</p>
    </div>
  );
}
