import { IdAndName } from "@/common/schemas/id-and-name-schema";
import { PlaceRead } from "@/modules/places/schemas/place-read-schema";

interface TransactionCategory extends IdAndName {
  parent: IdAndName | null;
}

export interface TransactionRead {
  datetime: Date;
  id: string;
  amount: string;
  fromWallet: IdAndName | null;
  toWallet: IdAndName | null;
  category: TransactionCategory | null;
  place: PlaceRead | null;
  description: string | null;
  tags: IdAndName[];
}
