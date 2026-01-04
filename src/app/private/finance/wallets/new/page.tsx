import type { Metadata } from "next";
import { Heading1 } from "@/components/typography";
import { CreateWalletForm } from "@/modules/finance/components/forms/create-wallet-form";

export const metadata: Metadata = {
  title: "New Wallet",
};

export default function NewWalletPage() {
  return (
    <div className="space-y-12">
      <Heading1>New Wallet</Heading1>
      <CreateWalletForm />
    </div>
  );
}
