import { z } from "zod";

export const walletCreateFormSchema = z.object({
  name: z.string().min(1).max(255),
  initialAmount: z.number(),
});

export type WalletCreateForm = z.infer<typeof walletCreateFormSchema>;
