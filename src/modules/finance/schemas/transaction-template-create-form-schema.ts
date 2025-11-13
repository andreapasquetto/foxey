import { z } from "zod";

export const transactionTemplateCreateFormSchema = z.object({
  name: z.string().min(1),
  fromWalletId: z.uuid().optional(),
  toWalletId: z.uuid().optional(),
  categoryId: z.uuid().optional(),
  placeId: z.uuid().optional(),
  amount: z.number().optional(),
});

export type TransactionTemplateCreateForm = z.infer<typeof transactionTemplateCreateFormSchema>;
