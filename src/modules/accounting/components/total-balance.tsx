import { currencyFormatter } from "@/common/formatters";
import { CardDescription, CardTitle } from "@/components/ui/card";

export function TotalBalance() {
  // TODO: calculate balances from all transactions or get directly from wallet
  const totalBalance = 0;

  return (
    <div className="my-12 space-y-1.5 pb-2 text-center">
      <CardDescription>Total balance</CardDescription>
      <CardTitle className="text-4xl font-bold">{currencyFormatter.format(totalBalance)}</CardTitle>
    </div>
  );
}
