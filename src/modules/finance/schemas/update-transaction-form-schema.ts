import { z } from "zod";

export const updateTransactionFormSchema = z.object({
  id: z.string(),
  datetime: z.date(),
  categoryId: z.string().optional(),
  placeId: z.string().optional(),
  amount: z.number().min(0.01),
  description: z.string().optional(),
});

export type UpdateTransactionFormType = z.infer<typeof updateTransactionFormSchema>;
