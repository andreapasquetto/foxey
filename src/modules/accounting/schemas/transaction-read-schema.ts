import { IdName, IdNameParent } from "@/common/types";
import { PlaceRead } from "@/modules/places/schemas/place-read-schema";

export interface TransactionRead {
  id: string;
  datetime: Date;
  fromWallet: IdName | null;
  toWallet: IdName | null;
  category: IdNameParent | null;
  place: PlaceRead | null;
  description: string | null;
  amount: string;
  tags: IdName[];
}
