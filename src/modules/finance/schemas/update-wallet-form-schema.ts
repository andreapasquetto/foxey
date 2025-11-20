import { z } from "zod";
import { requiredStringSchema } from "@/common/schemas";

export const updateWalletFormSchema = z.object({
  id: z.uuid({ error: "Required" }),
  name: requiredStringSchema,
  isArchived: z.boolean(),
});

export type UpdateWalletFormType = z.infer<typeof updateWalletFormSchema>;
