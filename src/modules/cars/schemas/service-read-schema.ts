import { CarRead } from "@/modules/cars/schemas/car-read-schema";

export interface ServiceRead {
  id: string;
  car: CarRead;
  datetime: Date;
  odometer: string;
}
