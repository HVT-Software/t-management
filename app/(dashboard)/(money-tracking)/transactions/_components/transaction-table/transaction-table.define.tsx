import { Transaction } from "@lib/models/transaction";
import { ColumnDef } from "@tanstack/react-table";
import { TransactionTypeBadge } from "../transaction-type-badge/transaction-type-badge";

export const transactionCollumns: ColumnDef<Transaction>[] = [
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
    header: "Ngày",
    accessorKey: "date"
  },
  {
    header: "Nhóm chi tiêu",
    accessorKey: "category",
    cell: ({ row }) => row.original.category.name
  }
];
