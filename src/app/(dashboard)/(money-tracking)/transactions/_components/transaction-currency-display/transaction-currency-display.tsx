import { toCurrency } from "@/utils/format";
import { cva } from "class-variance-authority";

interface TransactionCurrencyDisplayProps {
  type: number; // 0 for income, 1 for expense, other for transfer
  amount: number;
}

export function TransactionCurrencyDisplay({ type, amount }: TransactionCurrencyDisplayProps) {
  // Map numeric type to string type for styling
  const displayType = type === 0 ? "income" : type === 1 ? "expense" : "transfer";

  // Get prefix based on transaction type
  const prefix = type === 1 ? "-" : type === 0 ? "+" : "";

  // Style variant based on transaction type
  const currencyStyles = cva("text-right w-full block", {
    variants: {
      type: {
        income: "text-green-600",
        expense: "text-destructive",
        transfer: "text-yellow-600"
      }
    }
  });

  return (
    <span className={currencyStyles({ type: displayType })}>
      {prefix}
      {toCurrency(Math.abs(amount))}
    </span>
  );
}
