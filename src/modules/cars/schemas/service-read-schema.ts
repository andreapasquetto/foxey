import { CarRead } from "./car-read-schema";

export interface ServiceRead {
  id: string;
  car: CarRead;
  datetime: Date;
  odometer: string;
}
