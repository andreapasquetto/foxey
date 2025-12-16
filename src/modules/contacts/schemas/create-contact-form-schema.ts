import { z } from "zod";
import { nullableStringSchema, requiredStringSchema } from "@/common/schemas";

export const createContactFormSchema = z.object({
  fullName: requiredStringSchema,
  subtitle: nullableStringSchema,
  isBusiness: z.boolean(),
  dob: z.date().nullable(),
  ignoreDobYear: z.boolean(),
});

export type CreateContactFormType = z.infer<typeof createContactFormSchema>;
