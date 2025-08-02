import { Heading1 } from "@/components/typography";
import { WalletUpdateForm } from "@/modules/finance/components/forms/wallet-update-form";
import { walletsGetById } from "@/modules/finance/finance-actions";

interface WalletUpdatePageProps {
  params: Promise<{ id: string }>;
}

export default async function WalletUpdatePage(props: WalletUpdatePageProps) {
  const id = (await props.params).id;
  const wallet = await walletsGetById(id);

  return (
    <div className="space-y-12">
      <Heading1>Edit Wallet</Heading1>
      <WalletUpdateForm wallet={wallet} />
    </div>
  );
}
