import { z } from "zod";
import {
  nullableStringSchema,
  positiveRequiredNumberSchema,
} from "@/common/schemas";

export const updateTransactionFormSchema = z.object({
  id: z.uuid(),
  datetime: z.date(),
  categoryId: z.uuid().nullable(),
  placeId: z.uuid().nullable(),
  amount: positiveRequiredNumberSchema,
  description: nullableStringSchema,
  tagId: z.uuid().nullable(),
});

export type UpdateTransactionFormType = z.infer<
  typeof updateTransactionFormSchema
>;
