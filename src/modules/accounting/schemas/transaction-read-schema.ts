export interface TransactionRead {
  id: string;
  date: Date;
  fromWalletId: string | null;
  toWalletId: string | null;
  categoryId: string | null;
  amount: string;
  description: string | null;
}
