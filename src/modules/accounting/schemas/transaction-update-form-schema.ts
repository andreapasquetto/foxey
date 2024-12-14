import { coercedOptionalString } from "@/common/schemas";
import { z } from "zod";

export const transactionUpdateFormSchema = z.object({
  id: z.string(),
  datetime: z.coerce.date(),
  categoryId: z.string().optional(),
  placeId: z.string().optional(),
  amount: z.number().min(0.01),
  description: coercedOptionalString,
});

export type TransactionUpdateForm = z.infer<typeof transactionUpdateFormSchema>;
