"use client";

import { trpcClient } from "@/app/_trpc/client";
import GoBack from "@/components/shared/go-back";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Category, categorySchema } from "@/lib/models/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CategoryTable } from "../../_components/category-table/category-table";
import { categoryParamsCache } from "../../_lib/category-validations";

const CategoryDialog: React.FC = () => {
  const form = useForm<Category>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      budget: 0
    }
  });

  const { mutate } = trpcClient.category.save.useMutation({
    onSuccess: () => {
      toast.success("Tạo nhóm chi tiêu thành công!");
      form.reset();
    }
  });

  const searchParams = useSearchParams();
  const categoryParams = Object.fromEntries(searchParams.entries());
  const filter = categoryParamsCache.parse(categoryParams);

  return (
    <AlertDialog open key="create-category">
      <AlertDialogContent className="sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Tạo nhóm chi tiêu</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(values => mutate(values))} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên nhóm</FormLabel>
                  <FormControl>
                    <Input placeholder="Tên nhóm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Input placeholder="Mô tả" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngân sách</FormLabel>
                  <FormControl>
                    <Input placeholder="Category budget" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <GoBack />
              <Button type="submit">Tạo</Button>
            </AlertDialogFooter>
          </form>
        </Form>
        <Card className="w-full overflow-auto">
          <CategoryTable filter={filter} />
        </Card>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CategoryDialog;
