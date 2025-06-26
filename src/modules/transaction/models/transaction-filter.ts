import { ETransactionType } from './transaction-type';

export interface TransactionFilter extends ListRequest {
  types: ETransactionType[];
  categoryIds: string[];
  date: number[];
}
