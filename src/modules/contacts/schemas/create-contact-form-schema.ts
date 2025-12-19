import { z } from "zod";
import { nullableStringSchema, requiredStringSchema } from "@/common/schemas";

export const createContactFormSchema = z.object({
  fullName: requiredStringSchema,
  subtitle: nullableStringSchema,
  isBusiness: z.boolean(),
  dob: z.date().nullable(),
  ignoreDobYear: z.boolean(),
  phoneNumbers: z.array(
    z.object({ value: z.e164({ error: "Invalid phone number" }) }),
  ),
  emails: z.array(z.object({ value: z.email({ error: "Invalid email" }) })),
  addresses: z.array(z.object({ value: requiredStringSchema })),
});

export type CreateContactFormType = z.infer<typeof createContactFormSchema>;
