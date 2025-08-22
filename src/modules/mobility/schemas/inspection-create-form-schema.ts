import { z } from "zod";

export const inspectionCreateFormSchema = z.object({
  datetime: z.date(),
  carId: z.string().min(1).max(255),
  odometer: z.number(),
  isSuccessful: z.boolean(),
});

export type InspectionCreateForm = z.infer<typeof inspectionCreateFormSchema>;
