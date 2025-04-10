import { Category } from "@/lib/models/category";
import { ColumnDef } from "@tanstack/react-table";

export const categoryColumns: ColumnDef<Category>[] = [
  {
    header: "Ngày tạo",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const date = row.original.createdAt ? new Date(row.original.createdAt) : new Date();
      return (
        <span className="flex items-center justify-center">
          {date?.toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          })}
        </span>
      );
    }
  },
  {
    header: "Tên danh mục",
    accessorKey: "name"
  },
  {
    header: "Số tiền",
    accessorKey: "budget",
    cell: ({ row }) => {
      const budget = row.original.budget;
      return (
        <span className="text-right w-full block">
          {budget?.toLocaleString("vi-VN", {
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
  }
];
