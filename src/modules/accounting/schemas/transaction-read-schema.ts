import { IdAndName } from "@/common/types";
import { PlaceRead } from "@/modules/places/schemas/place-read-schema";

interface TransactionCategory extends IdAndName {
  parent: IdAndName | null;
}

export interface TransactionRead {
  id: string;
  datetime: Date;
  fromWallet: IdAndName | null;
  toWallet: IdAndName | null;
  category: TransactionCategory | null;
  place: PlaceRead | null;
  description: string | null;
  amount: string;
  tags: IdAndName[];
}
