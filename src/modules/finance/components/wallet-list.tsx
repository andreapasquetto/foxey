import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
import { WalletCard } from "@/modules/finance/components/wallet-card";
import { walletsGetAll } from "@/modules/finance/finance-actions";

export async function WalletList() {
  const wallets = await walletsGetAll();

  if (!wallets.length) {
    return <EmptyStateMessage message="There are no wallets." />;
  }

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {wallets.map((wallet) => (
        <WalletCard key={wallet.id} wallet={wallet} />
      ))}
    </div>
  );
}
