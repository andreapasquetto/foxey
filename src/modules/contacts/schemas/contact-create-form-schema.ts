import { z } from "zod";

export const contactCreateFormSchema = z.object({
  fullName: z.string(),
  dob: z.date(),
  isArchived: z.boolean().default(false),
  isBusiness: z.boolean().default(false),
  subtitle: z.string(),
  phoneNumbers: z.array(z.string()),
  emails: z.array(z.string()),
  addresses: z.array(z.string()),
});

export type ContactCreateForm = z.infer<typeof contactCreateFormSchema>;
