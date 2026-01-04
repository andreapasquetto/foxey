import type { Metadata } from "next";
import { Heading1 } from "@/components/typography";
import { UpdateWalletForm } from "@/modules/finance/components/forms/update-wallet-form";
import { getWalletById } from "@/modules/finance/server-actions";

export const metadata: Metadata = {
  title: "Wallet Details",
};

export default async function UpdateWalletPage(props: {
  params: Promise<{ id: string }>;
}) {
  const id = (await props.params).id;
  const wallet = await getWalletById(id);

  return (
    <div className="space-y-12">
      <Heading1>Edit Wallet</Heading1>
      <UpdateWalletForm wallet={wallet} />
    </div>
  );
}
