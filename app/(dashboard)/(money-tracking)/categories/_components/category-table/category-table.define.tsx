import { Category } from "@/lib/models/category";
import { formatDate } from "@/lib/utils/format";
import { ColumnDef } from "@tanstack/react-table";

export const categoryColumns: ColumnDef<Category>[] = [
  {
    header: "Ngày tạo",
    accessorKey: "createdAt",
    enableColumnFilter: true,
    meta: {
      label: "Ngày tạo",
      variant: "dateRange"
    },
    cell: ({ row }) => {
      const date = row.original.createdAt ? new Date(row.original.createdAt) : new Date();
      return <span>{formatDate(date)}</span>;
    }
  },
  {
    header: "Tên danh mục",
    accessorKey: "name",
    enableColumnFilter: true,
    meta: {
      label: "Tên danh mục"
    }
  },
  {
    header: () => <span className="text-right w-full block">Số tiền</span>,
    accessorKey: "budget",
    cell: ({ row }) => {
      const budget = row.original.budget;
      return <span className="text-right w-full block">{budget}</span>;
    }
  },
  {
    header: "Mô tả",
    accessorKey: "description"
  }
];
