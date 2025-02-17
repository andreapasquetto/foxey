import { IdName } from "@/common/types";
import { WalletRead } from "@/modules/accounting/schemas/wallet-read-schema";
import { PlaceRead } from "@/modules/places/schemas/place-read-schema";

interface TransactionCategoryRead extends IdName {
  userId: string;
}

interface TransactionTagRead {
  tagId: string;
  transactionId: string;
  tag: TagRead;
}

interface TagRead extends IdName {
  userId: string;
}

export interface TransactionRead {
  id: string;
  userId: string;
  datetime: Date;
  categoryId: string | null;
  category: TransactionCategoryRead | null;
  fromWalletId: string | null;
  from: WalletRead | null;
  toWalletId: string | null;
  to: WalletRead | null;
  amount: string;
  description: string | null;
  placeId: string | null;
  place: PlaceRead | null;
  tags: TransactionTagRead[];
}
