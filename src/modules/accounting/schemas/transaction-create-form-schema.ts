import { z } from "zod";

export const transactionCreateFormSchema = z.object({
  date: z.coerce.date(),
  fromWalletId: z.string().optional(),
  toWalletId: z.string().optional(),
  categoryId: z.string().optional(),
  amount: z.number().min(0.01),
  description: z.string(),
});

export type TransactionCreateForm = z.infer<typeof transactionCreateFormSchema>;
