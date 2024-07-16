import { z } from "zod";

export const transactionCreateFormSchema = z.object({
  datetime: z.date(),
  from: z.string().optional(),
  to: z.string().optional(),
  amount: z.number(),
  description: z.string(),
});

export type TransactionCreateForm = z.infer<typeof transactionCreateFormSchema>;
