import { z } from "zod";
import { requiredStringSchema } from "@/common/schemas";

export const createTransactionTemplateFormSchema = z.object({
  name: requiredStringSchema,
  categoryId: z.uuid().optional(),
  placeId: z.uuid().optional(),
  fromWalletId: z.uuid().optional(),
  toWalletId: z.uuid().optional(),
  amount: z.number().optional(),
});

export type CreateTransactionTemplateFormType = z.infer<
  typeof createTransactionTemplateFormSchema
>;
