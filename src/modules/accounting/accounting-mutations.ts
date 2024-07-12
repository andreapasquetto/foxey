import { walletsQueryKey } from "@/common/query-keys";
import { createWallet } from "@/modules/accounting/accounting-actions";
import { WalletCreateForm } from "@/modules/accounting/schemas/wallet-create-form-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useWalletCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: walletsQueryKey(),
    mutationFn: (wallet: WalletCreateForm) => createWallet(wallet),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: walletsQueryKey() }),
  });
}
