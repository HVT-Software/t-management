import { ETransactionType } from "@lib/enums/transaction-type";
import { Category } from "./category";

export interface Transaction {
  id: string;

  userId: string;
  categoryId: string;

  type: ETransactionType;

  amount: number;

  description: string;

  date: string;

  createdAt: string;

  category: Category;
}
