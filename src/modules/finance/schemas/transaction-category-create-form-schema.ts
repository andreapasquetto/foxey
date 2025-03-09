import { z } from "zod";

export const transactionCategoryCreateFormSchema = z.object({
  name: z.string(),
  parentId: z.string().optional(),
});

export type TransactionCategoryCreateForm = z.infer<typeof transactionCategoryCreateFormSchema>;
