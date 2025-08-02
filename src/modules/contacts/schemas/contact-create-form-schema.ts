import { z } from "zod";

export const contactCreateFormSchema = z.object({
  fullName: z.string().min(1),
  dob: z.date().optional(),
  isArchived: z.boolean().default(false),
  isBusiness: z.boolean().default(false),
  subtitle: z.string().optional(),
  phoneNumbers: z.array(z.string()),
  emails: z.array(z.string()),
  addresses: z.array(z.string()),
});

export type ContactCreateForm = z.infer<typeof contactCreateFormSchema>;
