export enum ETransactionType {
  INCOME,
  EXPENSE
}

export const TRANSACTION_TYPE_LABELS: Record<ETransactionType, string> = {
  [ETransactionType.INCOME]: "Thu nhập",
  [ETransactionType.EXPENSE]: "Chi phí"
};

export function getTransactionTypeLabel(type: ETransactionType): string {
  return TRANSACTION_TYPE_LABELS[type] || "Unknown";
}

// Get list type of enum
export function getTransactionTypeList(): Array<{ label: string; value: ETransactionType }> {
  return Object.entries(TRANSACTION_TYPE_LABELS).map(([key, label]) => ({
    label,
    value: ETransactionType[key as keyof typeof ETransactionType]
  }));
}
