import { Option } from "@/types/data-table";

export enum ETransactionType {
  INCOME = 0,
  EXPENSE = 1
}

export const TRANSACTION_TYPE_LABELS: Record<ETransactionType, string> = {
  [ETransactionType.INCOME]: "Thu nhập",
  [ETransactionType.EXPENSE]: "Chi phí"
};

// Get list type of enum
export function getTransactionTypeList(): Array<Option> {
  return Object.entries(TRANSACTION_TYPE_LABELS).map(([key, label]) => ({
    label: label,
    value: key
  }));
}
