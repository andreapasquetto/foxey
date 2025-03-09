import { z } from "zod";

export const walletUpdateFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(255),
});

export type WalletUpdateForm = z.infer<typeof walletUpdateFormSchema>;
