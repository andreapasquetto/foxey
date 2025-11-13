import type { Metadata } from "next";
import { Heading1 } from "@/components/typography";
import { WalletCreateForm } from "@/modules/finance/components/forms/wallet-create-form";

export const metadata: Metadata = {
  title: "New Wallet",
};

export default function WalletCreatePage() {
  return (
    <div className="space-y-12">
      <Heading1>New Wallet</Heading1>
      <WalletCreateForm />
    </div>
  );
}
