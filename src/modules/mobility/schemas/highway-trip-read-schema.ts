import { TransactionRead } from "@/modules/accounting/schemas/transaction-read-schema";

export interface HighwayTripRead {
  id: string;
  transaction: TransactionRead;
  startingToll: string;
  endingToll: string;
  distance: string;
  avgSpeed: string | null;
}
