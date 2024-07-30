import { currencyFormatter } from "@/common/formatters";
import { CircularSpinner } from "@/components/circular-spinner";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { useWalletsQuery } from "@/modules/accounting/accounting-queries";
import { calculateTotalBalance } from "@/modules/accounting/accounting-utils";

export function TotalBalance() {
  const { data: wallets, isFetching } = useWalletsQuery();

  if (!wallets || isFetching) {
    return <CircularSpinner className="mx-auto" />;
  }

  const totalBalance = calculateTotalBalance(wallets).toNumber();

  return (
    <div className="my-12 space-y-1.5 pb-2 text-center">
      <CardDescription>Total balance</CardDescription>
      <CardTitle className="text-4xl font-bold">{currencyFormatter.format(totalBalance)}</CardTitle>
    </div>
  );
}
