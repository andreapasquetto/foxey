import { z } from "zod";

export const updateWalletFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(255),
  isArchived: z.boolean(),
});

export type UpdateWalletFormType = z.infer<typeof updateWalletFormSchema>;
