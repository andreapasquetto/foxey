import { z } from "zod";

export const createTransactionCategoryFormSchema = z.object({
  name: z.string(),
  parentId: z.string().optional(),
});

export type CreateTransactionCategoryFormType = z.infer<typeof createTransactionCategoryFormSchema>;
