interface BasicRecord {
  id: string;
  name: string;
}

interface TransactionCategory extends BasicRecord {
  parent: BasicRecord | null;
}

export interface TransactionRead {
  datetime: Date;
  id: string;
  amount: string;
  fromWallet: BasicRecord | null;
  toWallet: BasicRecord | null;
  category: TransactionCategory | null;
  description: string | null;
  tags: BasicRecord[];
}
