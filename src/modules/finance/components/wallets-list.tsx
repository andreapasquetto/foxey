import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
import { WalletItem } from "@/modules/finance/components/wallet-item";
import { getAllWallets } from "@/modules/finance/server-actions";

export async function WalletsList() {
  const wallets = await getAllWallets();

  if (!wallets.length) {
    return <EmptyStateMessage message="There are no wallets." />;
  }

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {wallets.map((wallet) => (
        <WalletItem key={wallet.id} wallet={wallet} />
      ))}
    </div>
  );
}
