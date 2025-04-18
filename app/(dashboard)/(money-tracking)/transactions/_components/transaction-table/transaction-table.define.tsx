import { getTransactionTypeList } from "@/lib/enums/transaction-type";
import { Category } from "@/lib/models/category";
import { Transaction } from "@/lib/models/transaction";
import { toCurrency, formatDate } from "@/lib/utils/format";
import { Option } from "@/types/data-table";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { TransactionTypeBadge } from "../transaction-type-badge/transaction-type-badge";

export const transactionColumns = (categories: Array<Category>): ColumnDef<Transaction>[] => [
  {
    header: "Ngày tạo",
    accessorKey: "date",
    meta: {
      label: "Thời gian",
      variant: "dateRange",
      placeholder: "Từ ngày - Đến ngày"
    },
    size: 100,
    enableColumnFilter: true,
    enableSorting: false,
    cell: ({ row }) => {
      const date = row.original.date;
      return <span className="flex items-center">{formatDate(date)}</span>;
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
          {row.original.type === 1 ? "-" : row.original.type === 0 ? "+" : ""}
          {toCurrency(Math.abs(amount))}
        </span>
      );
    }
  }
];
