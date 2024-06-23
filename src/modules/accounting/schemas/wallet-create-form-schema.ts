import { z } from "zod";

export const walletCreateFormSchema = z.object({
  name: z.string().min(1).max(255),
  initialBalance: z.number(),
});

export type WalletCreateForm = z.infer<typeof walletCreateFormSchema>;
