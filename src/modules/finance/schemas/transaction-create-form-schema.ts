import { z } from "zod";

export const transactionCreateFormSchema = z.object({
  datetime: z.date(),
  fromWalletId: z.uuid().optional(),
  toWalletId: z.uuid().optional(),
  categoryId: z.uuid().optional(),
  placeId: z.uuid().optional(),
  amount: z.number().min(0.01),
  description: z.string().optional(),
});

export type TransactionCreateForm = z.infer<typeof transactionCreateFormSchema>;
