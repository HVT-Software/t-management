"use client";

import { DataTable } from "@/components/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { Category } from "@/lib/models/category";
import { CategoryFilter } from "../../_lib/category-validations";
import { useQueryCategories } from "../../_queries/use-query-categories";
import { categoryColumns } from "./category-table.define";

interface CategoryTableProps {
  filter: CategoryFilter;
}

export const CategoryTable: React.FC<CategoryTableProps> = ({ filter }) => {
  const { data } = useQueryCategories(filter);

  const { table } = useDataTable<Category>({
    data: data?.items ?? [],
    columns: categoryColumns,
    pageCount: data?.totalCount ? Math.ceil(data.totalCount / filter.pageSize) : 0,
    getRowId: originalRow => originalRow.id!,
    shallow: false,
    clearOnDefault: true
  });

  return <DataTable table={table} />;
};
