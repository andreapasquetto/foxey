import { transactionCreateFormSchema } from "@/modules/finance/schemas/transaction-create-form-schema";
import { z } from "zod";

export const transactionTemplateCreateFormSchema = transactionCreateFormSchema
  .omit({
    datetime: true,
    description: true,
  })
  .extend({
    name: z.string().min(1),
  })
  .partial({
    amount: true,
  });

export type TransactionTemplateCreateForm = z.infer<typeof transactionTemplateCreateFormSchema>;
