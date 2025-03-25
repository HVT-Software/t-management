import { Transaction } from "@lib/models/transaction";
import { ColumnDef } from "@tanstack/react-table";
import { TransactionTypeBadge } from "../transaction-type-badge/transaction-type-badge";

export const transactionCollumns: ColumnDef<Transaction>[] = [
  {
    header: "Ngày",
    accessorKey: "date",
    cell: ({ row }) => {
      const date = new Date(row.original.date);
      return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      });
    }
  },
  {
    header: "Loại",
    accessorKey: "type",
    cell: ({ row }) => <TransactionTypeBadge type={row.original.type} />
  },
  {
    header: "Số tiền",
    accessorKey: "amount"
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
