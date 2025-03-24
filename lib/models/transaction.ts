import { Category } from "./category";

export enum TransactionType {
  INCOME,
  EXPENSE
}

export interface Transaction {
  id: string;

  userId: string;
  categoryId: string;

  type: TransactionType;

  amount: number;

  description: string;

  date: string;

  createdAt: string;

  category: Category;
}
