import { Heading1 } from "@/components/typography";
import { WalletCreateForm } from "@/modules/accounting/components/wallet-create-form";

export default function WalletCreatePage() {
  return (
    <div className="space-y-12">
      <Heading1>New Wallet</Heading1>
      <WalletCreateForm />
    </div>
  );
}