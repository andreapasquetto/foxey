import { z } from "zod";

export const refuelingCreateFormSchema = z.object({
  datetime: z.coerce.date(),
  carId: z.string().min(1).max(255),
  placeId: z.string().min(1).max(255).optional(),
  price: z.number().min(0),
  quantity: z.number().min(0),
  cost: z.number().min(0),
  isFull: z.boolean().default(false),
  isNecessary: z.boolean().default(true),
  trip: z.number().optional(),
  odometer: z.number(),
});

export type RefuelingCreateForm = z.infer<typeof refuelingCreateFormSchema>;