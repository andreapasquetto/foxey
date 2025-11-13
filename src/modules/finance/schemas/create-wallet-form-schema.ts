import { z } from "zod";

export const createWalletFormSchema = z.object({
  name: z.string().min(1).max(255),
  initialAmount: z.number().optional(),
});

export type CreateWalletFormType = z.infer<typeof createWalletFormSchema>;
