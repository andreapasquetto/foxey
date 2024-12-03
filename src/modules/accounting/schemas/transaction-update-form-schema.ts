import { transactionCreateFormSchema } from "@/modules/accounting/schemas/transaction-create-form-schema";
import { z } from "zod";

export const transactionUpdateFormSchema = transactionCreateFormSchema.extend({
  id: z.string(),
});

export type TransactionUpdateForm = z.infer<typeof transactionUpdateFormSchema>;
