import { getWallets } from "@/modules/accounting/accounting-actions";
import { useQuery } from "@tanstack/react-query";

export function useWalletsQuery() {
  return useQuery({
    queryKey: ["wallets"],
    queryFn: () => getWallets(),
  });
}
