import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/format";
import { Category } from "@/types/category/category";
import { Option } from "@/types/data-table";
import { getTransactionTypeList } from "@/types/transaction/transaction-type";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { TransactionCurrencyDisplay } from "../transaction-currency-display/transaction-currency-display";
import { TransactionTypeBadge } from "../transaction-type-badge/transaction-type-badge";
import { Transaction } from "@/types/transaction/transaction";

export const transactionColumns = (
  categories: Array<Category>,
  onEdit: (id: string) => void,
  onDelete: (id: string) => void
): ColumnDef<Transaction>[] => [
  {
    id: "date",
    header: "Ngày tạo",
    accessorKey: "date",
    meta: {
      label: "Thời gian",
      variant: "dateRange"
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
    id: "categoryIds",
    header: "Danh mục",
    accessorKey: "categoryId",
    size: 100,
    cell: ({ row }) => row.original.category?.name || "Chưa chọn",
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
    id: "types",
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
      return <TransactionCurrencyDisplay type={row.original.type} amount={amount} />;
    }
  },
  {
    id: "actions",
    header: () => <span className="text-center w-full block">Thao tác</span>,
    size: 50,
    cell: ({ row }) => {
      const transaction = row.original;
      return (
        <div className="flex items-center justify-center">
          <Button variant="ghost" size="icon" onClick={() => onEdit(transaction.id)}>
            <Edit className="text-blue-400" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(transaction.id)}>
            <Trash2 className="text-red-400" />
          </Button>
        </div>
      );
    }
  }
];
