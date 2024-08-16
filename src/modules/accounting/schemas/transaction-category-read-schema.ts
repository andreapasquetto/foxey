export interface TransactionCategoryRead {
  id: string;
  name: string;
  parent: {
    id: string;
    name: string;
  } | null;
}
