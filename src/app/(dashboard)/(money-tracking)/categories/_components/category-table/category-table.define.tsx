import { Button } from "@/components/ui/button";
import { formatDate, toCurrency } from "@/utils/format";
import { Category } from "@/types/category/category";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";

export const categoryColumns = (onEdit: (id: string) => void, onDelete: (id: string) => void): ColumnDef<Category>[] => [
  {
    id: "date",
    header: "Ngày tạo",
    accessorKey: "createdAt",
    enableColumnFilter: true,
    meta: {
      label: "Ngày tạo",
      variant: "dateRange"
    },
    size: 30,
    cell: ({ row }) => {
      const date = row.original.createdAt ? new Date(row.original.createdAt) : new Date();
      return <span>{formatDate(date)}</span>;
    }
  },
  {
    header: "Tên danh mục",
    accessorKey: "name",
    enableColumnFilter: true
  },
  {
    header: "Mô tả",
    accessorKey: "description"
  },

  {
    header: () => <span className="text-right w-full block">Số tiền</span>,
    accessorKey: "budget",
    size: 100,
    cell: ({ row }) => {
      const budget = row.original.budget;
      return <span className="text-right w-full block">{toCurrency(budget || 0)}</span>;
    }
  },
  {
    header: () => <span className="text-right w-full block">Còn lại</span>,
    accessorKey: "remaining",
    size: 100,
    cell: ({ row }) => {
      const remaining = row.original.remaining;
      return <span className="text-right w-full block">{toCurrency(remaining || 0)}</span>;
    }
  },
  {
    id: "actions",
    header: () => <span className="text-center w-full block">Thao tác</span>,
    size: 50,
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="flex items-center justify-center">
          <Button variant="ghost" size="icon" onClick={() => onEdit(category.id!)}>
            <Edit className="text-blue-400" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(category.id!)}>
            <Trash2 className="text-red-400" />
          </Button>
        </div>
      );
    }
  }
];
