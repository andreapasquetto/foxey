import { z } from "zod";

export const createContactFormSchema = z.object({
  fullName: z.string().min(1),
  dob: z.date().optional(),
  ignoreDobYear: z.boolean(),
  isArchived: z.boolean(),
  isBusiness: z.boolean(),
  subtitle: z.string().optional(),
  phoneNumbers: z.array(z.string()),
  emails: z.array(z.string()),
  addresses: z.array(z.string()),
});

export type CreateContactFormType = z.infer<typeof createContactFormSchema>;
