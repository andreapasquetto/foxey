import { z } from "zod";
import { requiredStringSchema } from "@/common/schemas";

export const createTransactionTemplateFormSchema = z.object({
  name: requiredStringSchema,
  categoryId: z.uuid().nullable(),
  placeId: z.uuid().nullable(),
  fromWalletId: z.uuid().nullable(),
  toWalletId: z.uuid().nullable(),
  amount: z.number().nullable(),
});

export type CreateTransactionTemplateFormType = z.infer<
  typeof createTransactionTemplateFormSchema
>;
