import { currencyFormatter } from "@/common/formatters";
import { walletRoute } from "@/common/routes";
import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { walletsGetAll } from "@/modules/finance/finance-actions";
import { Edit } from "lucide-react";
import Link from "next/link";

export async function WalletList() {
  const wallets = await walletsGetAll();

  if (!wallets.length) {
    return <EmptyStateMessage message="There are no wallets." />;
  }

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {wallets.map((wallet) => (
        <Card key={wallet.id} className="relative">
          <div className="absolute top-2 right-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href={walletRoute(wallet.id)} prefetch>
                <Edit className="size-5" />
              </Link>
            </Button>
          </div>
          <CardHeader>
            <CardTitle>{wallet.name}</CardTitle>
            <CardDescription>
              <code>{currencyFormatter.format(parseFloat(wallet.amount))}</code>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
