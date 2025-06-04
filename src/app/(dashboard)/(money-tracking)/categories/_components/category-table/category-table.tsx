"use client";

import { trpcClient } from "@/app/_trpc/client";
import { DataTable } from "@/components/data-table";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { Card } from "@/components/ui/card";
import { useDataTable } from "@/hooks/use-data-table";
import { Category } from "@/types/category/category";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CategoryFilter } from "../../../transactions/_lib/category-validations";
import { useQueryCategories } from "../../../transactions/_queries/use-query-categories";
import { CategoryDialog } from "../category-dialiog";
import { categoryColumns } from "./category-table.define";

interface CategoryTableProps {
  filter: CategoryFilter;
}

export const CategoryTable: React.FC<CategoryTableProps> = ({ filter }) => {
  const { data, refetch } = useQueryCategories(filter);
  const { mutateAsync: deleteCategory } = trpcClient.category.delete.useMutation({
    onSuccess: data => {
      if (data?.success) {
        toast.success(data.message);
        refetch();
      } else toast.error(data.message);
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [categoryId, setCategoryId] = useState<string>();

  const handleDelete = async (id: string) => {
    await deleteCategory(id);
    refetch();
  };

  const handleEdit = async (id: string) => {
    setCategoryId(id);
    setIsOpen(true);
  };

  const columns = useMemo(() => categoryColumns(handleEdit, handleDelete), [handleEdit, handleDelete]);

  const { table } = useDataTable<Category>({
    data: data?.items ?? [],
    columns: columns,
    pageCount: data?.totalCount ? Math.ceil(data.totalCount / filter.pageSize) : 0,
    getRowId: originalRow => originalRow.id!,
    shallow: false,
    clearOnDefault: true,
    enableColumnFilters: true
  });

  return (
    <Card className="flex flex-col p-2">
      <div className="flex items-center justify-end py-2 gap-2">
        <CategoryDialog refetch={refetch} isOpen={isOpen} setIsOpen={setIsOpen} categoryId={categoryId} />
      </div>
      <DataTable table={table}>
        <DataTableToolbar table={table} />
      </DataTable>
    </Card>
  );
};
