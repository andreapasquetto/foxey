import { CarRead } from "@/modules/mobility/schemas/car-read-schema";

export interface InspectionRead {
  id: string;
  car: CarRead;
  datetime: Date;
  odometer: string;
  isSuccessful: boolean;
}
