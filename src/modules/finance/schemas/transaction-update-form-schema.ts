import { z } from "zod";

export const transactionUpdateFormSchema = z.object({
  id: z.string(),
  datetime: z.date(),
  categoryId: z.string().optional(),
  placeId: z.string().optional(),
  amount: z.number().min(0.01),
  description: z.string().optional(),
});

export type TransactionUpdateForm = z.infer<typeof transactionUpdateFormSchema>;
