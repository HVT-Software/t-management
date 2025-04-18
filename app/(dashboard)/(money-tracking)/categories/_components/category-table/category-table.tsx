"use client";

import { DataTable } from "@/components/data-table";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { Card } from "@/components/ui/card";
import { useDataTable } from "@/hooks/use-data-table";
import { Category } from "@/lib/models/category";
import { CategoryFilter } from "../../../transactions/_lib/category-validations";
import { useQueryCategories } from "../../../transactions/_queries/use-query-categories";
import { CategoryDialog } from "../category-dialiog";
import { categoryColumns } from "./category-table.define";

interface CategoryTableProps {
  filter: CategoryFilter;
}

export const CategoryTable: React.FC<CategoryTableProps> = ({ filter }) => {
  const { data, refetch } = useQueryCategories(filter);

  const { table } = useDataTable<Category>({
    data: data?.items ?? [],
    columns: categoryColumns,
    pageCount: data?.totalCount ? Math.ceil(data.totalCount / filter.pageSize) : 0,
    getRowId: originalRow => originalRow.id!,
    shallow: false,
    clearOnDefault: true
  });

  return (
    <Card className="flex flex-col p-2">
      <div className="flex items-center justify-end py-2 gap-2">
        <CategoryDialog refetch={refetch} />
      </div>
      <DataTable table={table}>
        <DataTableToolbar table={table} />
      </DataTable>
    </Card>
  );
};
