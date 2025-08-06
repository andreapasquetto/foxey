import { z } from "zod";

export const serviceCreateFormSchema = z.object({
  datetime: z.coerce.date(),
  carId: z.string().min(1).max(255),
  odometer: z.number(),
  notes: z.string().max(255).optional(),
});

export type ServiceCreateForm = z.infer<typeof serviceCreateFormSchema>;
