import { z } from "zod";

export const serviceCreateFormSchema = z.object({
  datetime: z.date(),
  carId: z.string().min(1).max(255),
  odometer: z.number(),
  notes: z.string().max(255).optional(),
});

export type ServiceCreateForm = z.infer<typeof serviceCreateFormSchema>;
