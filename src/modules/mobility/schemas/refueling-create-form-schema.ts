import { z } from "zod";

export const refuelingCreateFormSchema = z.object({
  datetime: z.date(),
  carId: z.string().min(1).max(255),
  walletId: z.string().optional(),
  placeId: z.string().min(1).max(255).optional(),
  price: z.number().min(0),
  quantity: z.number().min(0),
  cost: z.number().min(0),
  isFull: z.boolean(),
  isNecessary: z.boolean(),
  trip: z.number().optional(),
  odometer: z.number(),
  description: z.string().optional(),
});

export type RefuelingCreateForm = z.infer<typeof refuelingCreateFormSchema>;
