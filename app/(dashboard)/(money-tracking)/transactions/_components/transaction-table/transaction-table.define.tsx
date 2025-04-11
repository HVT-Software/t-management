import { Transaction } from "@/lib/models/transaction";
import { ColumnDef } from "@tanstack/react-table";
import { TransactionTypeBadge } from "../transaction-type-badge/transaction-type-badge";
import { Category } from "@/lib/models/category";
import { Option } from "@/types/data-table";
import { getTransactionTypeList } from "@/lib/enums/transaction-type";
import clsx from "clsx";
import { formatCurrency } from "@/lib/utils/format";

export const transactionColumns = (categories: Array<Category>): ColumnDef<Transaction>[] => [
  {
    header: "Ngày",
    accessorKey: "date",
    meta: {
      label: "Ngày"
    },
    size: 100,
    cell: ({ row }) => {
      const date = row.original.date;
      return (
        <span className="flex items-center">
          {date.toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          })}
        </span>
      );
    }
  },
  {
    header: "Mô tả",
    meta: {
      label: "Mô tả"
    },
    accessorKey: "description",
    size: 150
  },
  {
    header: "Danh mục",
    accessorKey: "categoryId",
    size: 100,
    cell: ({ row }) => row.original.category!.name,
    meta: {
      label: "Danh mục",
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
    header: "Loại",
    accessorKey: "type",
    size: 100,
    cell: ({ row }) => (
      <span className="flex items-center">
        <TransactionTypeBadge type={row.original.type} />
      </span>
    ),
    meta: {
      label: "Loại",
      variant: "multiSelect",
      options: getTransactionTypeList()
    },
    enableColumnFilter: true
  },
  {
    header: () => <span className="text-right w-full block">Số tiền</span>,
    accessorKey: "amount",
    meta: {
      label: "Số tiền"
    },
    size: 200,
    cell: ({ row }) => {
      const amount = row.original.amount;
      return (
        <span className={clsx("text-right w-full block", row.original.type === 1 ? "text-destructive" : "text-green-600")}>
          {row.original.type === 1 ? "-" : ""}
          {formatCurrency(Math.abs(amount))}
        </span>
      );
    }
  }
];
