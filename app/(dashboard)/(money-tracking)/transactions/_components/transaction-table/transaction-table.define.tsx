import { Transaction } from "@/lib/models/transaction";
import { ColumnDef } from "@tanstack/react-table";
import { TransactionTypeBadge } from "../transaction-type-badge/transaction-type-badge";
import { Category } from "@/lib/models/category";
import { Option } from "@/types/data-table";

export const transactionColumns = (categories: Array<Category>): ColumnDef<Transaction>[] => [
  {
    header: "Ngày",
    accessorKey: "date",
    cell: ({ row }) => {
      const date = new Date(row.original.date);
      return (
        <span className="flex items-center">
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
      <span className="flex items-center">
        <TransactionTypeBadge type={row.original.type} />
      </span>
    ),
    meta: {
      label: "Status",
      variant: "multiSelect",
      options:
        categories.map(o => {
          return {
            value: o.id,
            label: o.name
          } as Option;
        }) ?? []
    },
    enableColumnFilter: true
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
    accessorKey: "categoryId",
    cell: ({ row }) => row.original.category.name
  }
];
