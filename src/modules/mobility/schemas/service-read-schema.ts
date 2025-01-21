import { CarRead } from "@/modules/mobility/schemas/car-read-schema";

export interface ServiceRead {
  id: string;
  car: CarRead;
  datetime: Date;
  odometer: string;
  notes: string | null;
}
