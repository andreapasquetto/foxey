import { z } from "zod";

export const createTransactionTemplateFormSchema = z.object({
  name: z.string().min(1),
  fromWalletId: z.uuid().optional(),
  toWalletId: z.uuid().optional(),
  categoryId: z.uuid().optional(),
  placeId: z.uuid().optional(),
  amount: z.number().optional(),
});

export type CreateTransactionTemplateFormType = z.infer<
  typeof createTransactionTemplateFormSchema
>;
