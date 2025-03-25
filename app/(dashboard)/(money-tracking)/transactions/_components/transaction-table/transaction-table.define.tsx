import { Transaction } from "@lib/models/transaction";
import { ColumnDef } from "@tanstack/react-table";
import { TransactionTypeBadge } from "../transaction-type-badge/transaction-type-badge";

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    header: "Ngày",
    accessorKey: "date",
    cell: ({ row }) => {
      const date = new Date(row.original.date);
      return (
        <span className="flex items-center justify-center">
          {date.toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
          })}
        </span>
      );
    }
  },
  {
    header: "Loại",
    accessorKey: "type",
    cell: ({ row }) => (
      <span className="flex items-center justify-center">
        <TransactionTypeBadge type={row.original.type} />
      </span>
    )
  },
  {
    header: "Số tiền",
    accessorKey: "amount",
    cell: ({ row }) => {
      const amount = row.original.amount;
      return (
        <span className="text-right w-full block">
          {amount.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND"
          })}
        </span>
      );
    }
  },
  {
    header: "Mô tả",
    accessorKey: "description"
  },
  {
    header: "Nhóm chi tiêu",
    accessorKey: "category",
    cell: ({ row }) => row.original.category.name
  }
];
