import { currencyFormatter } from "@/common/formatters";
import { CircularSpinner } from "@/components/circular-spinner";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { useWalletsQuery } from "@/modules/accounting/accounting-queries";

export function TotalBalance() {
  const { data: wallets, isFetching } = useWalletsQuery();

  // TODO: handle rounding error
  const totalBalance = wallets?.reduce((p, c) => p + Number(c.amount), 0) ?? 0;

  return (
    <div className="my-12 space-y-1.5 pb-2 text-center">
      <CardDescription>Total balance</CardDescription>

      {isFetching && <CircularSpinner className="mx-auto" />}
      {!isFetching && (
        <CardTitle className="text-4xl font-bold">
          {currencyFormatter.format(totalBalance)}
        </CardTitle>
      )}
    </div>
  );
}
