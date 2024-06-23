import { z } from "zod";

export const transactionCreateFormSchema = z.object({
  wallet: z.string().min(1).max(255),
  datetime: z.date(),
  type: z.string(),
  to: z.string().optional(),
  primaryCategory: z.string().min(1).max(255),
  secondaryCategory: z.string().optional(),
  amount: z.number(),
  description: z.string(),
});

export type TransactionCreateForm = z.infer<typeof transactionCreateFormSchema>;
