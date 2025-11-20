import { z } from "zod";
import { requiredStringSchema } from "@/common/schemas";

export const createTransactionCategoryFormSchema = z.object({
  name: requiredStringSchema,
});

export type CreateTransactionCategoryFormType = z.infer<
  typeof createTransactionCategoryFormSchema
>;
