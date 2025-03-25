import { Badge } from "@components/ui/badge";
import { ETransactionType } from "@lib/enums/transaction-type";

interface TransactionTypeBadgeProps {
  type: ETransactionType;
}

export const TransactionTypeBadge: React.FC<TransactionTypeBadgeProps> = ({ type }) => {
  let badgeText: string = "";
  let badgeVariant: "default" | "outline" | "destructive" = "default";

  switch (type) {
    case ETransactionType.INCOME:
      badgeText = "Thu nhập";
      badgeVariant = "outline";
      break;
    case ETransactionType.EXPENSE:
      badgeText = "Chi phí";
      badgeVariant = "destructive";
      break;
    default:
      badgeText = "Unknown";
  }

  return <Badge variant={badgeVariant}>{badgeText}</Badge>;
};
