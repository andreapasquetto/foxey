import { z } from "zod";
import { requiredStringSchema } from "@/common/schemas";

export const createWalletFormSchema = z.object({
  name: requiredStringSchema,
  initialAmount: z.number().nullable(),
});

export type CreateWalletFormType = z.infer<typeof createWalletFormSchema>;
