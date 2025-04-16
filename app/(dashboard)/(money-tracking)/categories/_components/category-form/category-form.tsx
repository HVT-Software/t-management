"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { trpcClient } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DialogClose } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Category, categorySchema } from "@/lib/models/category";
import { CategoryFormFields } from "./category-form.define";

interface CategoryFormProps {
  categoryId?: string;
  onSuccess?: () => void;
}

const DEFAULT_CATEGORY: Category = {
  name: "",
  description: "",
  budget: 0
};

export const CategoryForm: React.FC<CategoryFormProps> = ({ onSuccess }) => {
  const form = useForm<Category>({
    resolver: zodResolver(categorySchema),
    defaultValues: DEFAULT_CATEGORY
  });

  const { mutateAsync, isPending, isError } = trpcClient.category.save.useMutation({
    onSuccess: data => {
      toast.success(data.message);
      onSuccess?.();
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
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-2">
          <CategoryFormFields form={form} />
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" disabled={isFormDisabled}>
                Hủy
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isFormDisabled} className="min-w-[100px]">
              {isPending ? "Đang lưu..." : "Lưu"}
            </Button>
          </div>
        </form>
      </Card>
    </Form>
  );
};
