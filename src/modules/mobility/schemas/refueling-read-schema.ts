import { TransactionRead } from "@/modules/accounting/schemas/transaction-read-schema";
import { CarRead } from "@/modules/mobility/schemas/car-read-schema";

export interface RefuelingRead {
  id: string;
  car: CarRead;
  transaction: TransactionRead;
  ron: number;
  quantity: string;
  price: string;
  isFull: boolean;
  isNecessary: boolean;
  trip: string | null;
  odometer: string;
}
