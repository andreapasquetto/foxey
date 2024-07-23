import { z } from "zod";

export const transactionCreateFormSchema = z.object({
  date: z.string().pipe(z.coerce.date()),
  fromWalletId: z.string().optional(),
  toWalletId: z.string().optional(),
  amount: z.number(),
  description: z.string(),
});

export type TransactionCreateForm = z.infer<typeof transactionCreateFormSchema>;
