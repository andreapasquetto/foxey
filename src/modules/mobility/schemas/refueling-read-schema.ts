import { TransactionRead } from "@/modules/accounting/schemas/transaction-read-schema";

export interface RefuelingRead {
  id: string;
  transaction: TransactionRead;
  ron: number;
  quantity: string;
  price: string;
  isFull: boolean;
  isNecessary: boolean;
  trip: string | null;
  odometer: string;
}
