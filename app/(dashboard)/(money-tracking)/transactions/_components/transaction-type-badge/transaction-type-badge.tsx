import { Badge } from "@components/ui/badge";
import { TransactionType } from "@lib/models/transaction";

interface TransactionTypeBadgeProps {
  type: TransactionType;
}

export const TransactionTypeBadge: React.FC<TransactionTypeBadgeProps> = ({ type }) => {
  let badgeText: string = "";
  let badgeVariant: "default" | "outline" | "destructive" = "default";

  switch (type) {
    case TransactionType.INCOME:
      badgeText = "Thu nhập";
      badgeVariant = "outline";
      break;
    case TransactionType.EXPENSE:
      badgeText = "Chi phí";
      badgeVariant = "destructive";
      break;
    default:
      badgeText = "Unknown";
  }

  return <Badge variant={badgeVariant}>{badgeText}</Badge>;
};
