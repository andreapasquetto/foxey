import { currencyFormatter } from "@/common/formatters";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { mockedWallets } from "@/mocks/accounting";

export function TotalBalance() {
  const totalBalance = mockedWallets.reduce((p, c) => p + (c.balance ?? 0), 0);

  return (
    <div className="my-12 space-y-1.5 pb-2 text-center">
      <CardDescription>Total balance</CardDescription>
      <CardTitle className="text-4xl font-bold">{currencyFormatter.format(totalBalance)}</CardTitle>
    </div>
  );
}
