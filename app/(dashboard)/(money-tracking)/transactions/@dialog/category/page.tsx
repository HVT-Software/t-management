import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Params } from "@/types/common";
import React from "react";
import { categoryParamsCache } from "../../_lib/category-validations";
import { CategoryForm } from "../../_components/category-form/category-form";

const CategoryDialog: React.FC<Params> = async ({ searchParams }) => {
  const searchParamsValue = await searchParams;
  const filter = categoryParamsCache.parse(searchParamsValue);

  return (
    <AlertDialog open key="create-category">
      <AlertDialogContent className="sm:max-w-4xl lg:max-w-3xl xl:max-w-4xl max-h-[80vh] overflow-auto" aria-describedby={undefined}>
        <AlertDialogHeader>
          <AlertDialogTitle>Tạo nhóm chi tiêu</AlertDialogTitle>
        </AlertDialogHeader>
        <CategoryForm filter={filter} />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CategoryDialog;
