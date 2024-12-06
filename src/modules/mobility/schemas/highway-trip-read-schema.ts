import { TransactionRead } from "@/modules/accounting/schemas/transaction-read-schema";
import { CarRead } from "@/modules/mobility/schemas/car-read-schema";

export interface HighwayTripRead {
  id: string;
  car: CarRead;
  transaction: TransactionRead;
  startingToll: string;
  endingToll: string;
  distance: string;
  avgSpeed: string | null;
}
