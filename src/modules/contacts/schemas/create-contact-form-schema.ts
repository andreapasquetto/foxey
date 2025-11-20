import { z } from "zod";
import { optionalStringSchema, requiredStringSchema } from "@/common/schemas";

export const createContactFormSchema = z.object({
  fullName: requiredStringSchema,
  dob: z.date().optional(),
  ignoreDobYear: z.boolean(),
  isArchived: z.boolean(),
  isBusiness: z.boolean(),
  subtitle: optionalStringSchema,
  phoneNumbers: z.array(z.string()),
  emails: z.array(z.string()),
  addresses: z.array(z.string()),
});

export type CreateContactFormType = z.infer<typeof createContactFormSchema>;
