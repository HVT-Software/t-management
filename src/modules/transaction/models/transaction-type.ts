export enum ETransactionType {
  INCOME = 0,
  EXPENSE = 1,
  DEBT = 2
}

export const TRANSACTION_TYPE_LABELS: Record<ETransactionType, string> = {
  [ETransactionType.INCOME]: 'Thu nhập',
  [ETransactionType.EXPENSE]: 'Chi phí',
  [ETransactionType.DEBT]: 'Nợ'
};

export const TRANSACTION_TYPE_ICONS: Record<ETransactionType, string> = {
  [ETransactionType.INCOME]: 'i-mdi-currency-usd',
  [ETransactionType.EXPENSE]: 'i-mdi-currency-usd-off',
  [ETransactionType.DEBT]: 'i-mdi-account-cash'
};
