import { z } from "zod";
import {
  optionalStringSchema,
  positiveRequiredNumberSchema,
} from "@/common/schemas";

export const updateTransactionFormSchema = z.object({
  id: z.uuid(),
  datetime: z.date(),
  categoryId: z.uuid().optional(),
  placeId: z.uuid().optional(),
  amount: positiveRequiredNumberSchema,
  description: optionalStringSchema,
});

export type UpdateTransactionFormType = z.infer<
  typeof updateTransactionFormSchema
>;
