"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { trpcClient } from "@/app/_trpc/client";
import { DataTableSkeleton } from "@/components/data-table-skeleton";
import GoBack from "@/components/shared/go-back";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Category, categorySchema } from "@/lib/models/category";
import { Suspense } from "react";
import { CategoryTable } from "../../../_components/category-table/category-table";
import { CategoryFormFields } from "./category-form.define";
import { CategoryFilter } from "../../../_lib/category-validations";

interface CategoryFormProps {
  filter: CategoryFilter;
}

const DEFAULT_CATEGORY: Category = {
  name: "",
  description: "",
  budget: 0
};

export function CategoryForm({ filter }: CategoryFormProps) {
  const router = useRouter();

  const form = useForm<Category>({
    resolver: zodResolver(categorySchema),
    defaultValues: DEFAULT_CATEGORY
  });

  const { mutateAsync, isPending, isError } = trpcClient.category.save.useMutation({
    onSuccess: data => {
      toast.success(data.message);
      router.refresh();
    },
    onError: error => {
      console.error("Failed to save category:", error);
      toast.error("Thử lại sau ít phút");
    }
  });

  const handleSubmit = async (data: Category) => await mutateAsync(data);
  const isFormDisabled = isPending || isError;

  return (
    <Form {...form}>
      <Card className="p-2">
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <CategoryFormFields form={form} />

          <div className="flex justify-end gap-2">
            <GoBack />
            <Button type="submit" disabled={isFormDisabled} className="min-w-[100px]">
              {isPending ? "Đang lưu..." : "Lưu"}
            </Button>
          </div>
        </form>
      </Card>
      <Card className="w-full overflow-auto">
        <Suspense fallback={<DataTableSkeleton columnCount={6} filterCount={2} cellWidths={["10rem", "12rem", "12rem", "40rem"]} shrinkZero />}>
          <CategoryTable filter={filter} />
        </Suspense>
      </Card>
    </Form>
  );
}
