import { Badge } from "@/components/ui/badge";
import { ETransactionType } from "@/types/transaction/transaction-type";

interface TransactionTypeBadgeProps {
  type: ETransactionType;
}

export const TransactionTypeBadge: React.FC<TransactionTypeBadgeProps> = ({ type }) => {
  let badgeText: string = "";
  let badgeVariant: "default" | "outline" | "destructive" | "success" | "warning" = "default";

  switch (type) {
    case ETransactionType.INCOME:
      badgeText = "Thu nhập";
      badgeVariant = "success";
      break;
    case ETransactionType.EXPENSE:
      badgeText = "Chi phí";
      badgeVariant = "destructive";
      break;

    case ETransactionType.DEBT:
      badgeText = "Nợ";
      badgeVariant = "warning";
      break;
    default:
      badgeText = "Unknown";
  }

  return (
    <Badge className="w-[80px]" variant={badgeVariant}>
      {badgeText}
    </Badge>
  );
};
