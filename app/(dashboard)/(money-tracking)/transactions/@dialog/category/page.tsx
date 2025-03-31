"use client";

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { CategoryTable } from "../../_components/category-table/category-table";
import { categoryParamsCache } from "../../_lib/category-validations";
import { CategoryForm } from "../_components/category-form";

const CategoryDialog: React.FC = () => {
  const searchParams = useSearchParams();
  const categoryParams = Object.fromEntries(searchParams.entries());
  const filter = categoryParamsCache.parse(categoryParams);

  return (
    <AlertDialog open key="create-category">
      <AlertDialogContent className="sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Tạo nhóm chi tiêu</AlertDialogTitle>
        </AlertDialogHeader>
        <Card className="p-2">
          <CategoryForm />
        </Card>
        <Card className="w-full overflow-auto">
          <Suspense
            fallback={
              <DataTableSkeleton
                columnCount={6}
                searchableColumnCount={1}
                filterableColumnCount={2}
                cellWidths={["10rem", "12rem", "12rem", "40rem"]}
                shrinkZero
              />
            }
          >
            <CategoryTable filter={filter} />
          </Suspense>
        </Card>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CategoryDialog;
