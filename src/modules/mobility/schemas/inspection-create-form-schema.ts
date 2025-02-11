import { z } from "zod";

export const inspectionCreateFormSchema = z.object({
  datetime: z.coerce.date(),
  carId: z.string().min(1).max(255),
  odometer: z.number(),
  isSuccessful: z.boolean().default(true),
});

export type InspectionCreateForm = z.infer<typeof inspectionCreateFormSchema>;
