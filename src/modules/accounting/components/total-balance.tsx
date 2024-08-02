import { currencyFormatter } from "@/common/formatters";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useWalletsQuery } from "@/modules/accounting/accounting-queries";
import { calculateTotalBalance } from "@/modules/accounting/accounting-utils";

export function TotalBalance() {
  const query = useWalletsQuery();

  const totalBalance = calculateTotalBalance(query.data ?? []).toNumber();

  return (
    <div className="my-12 space-y-1.5 pb-2 text-center">
      <CardDescription>Total balance</CardDescription>
      {query.isFetching && <Skeleton className="mx-auto h-10 w-48" />}
      {!query.isFetching && (
        <CardTitle className="text-4xl font-bold">
          {currencyFormatter.format(totalBalance)}
        </CardTitle>
      )}
    </div>
  );
}
