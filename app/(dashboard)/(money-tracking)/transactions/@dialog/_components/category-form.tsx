"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Category, categorySchema } from "@/lib/models/category";
import { toast } from "sonner";
import { trpcClient } from "@/app/_trpc/client";

interface CategoryFormProps {
  initialData?: Category;
  isSubmitting?: boolean;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData = { name: "", description: "", budget: 0 }, isSubmitting = false }) => {
  const router = useRouter();

  const { mutateAsync } = trpcClient.category.save.useMutation();

  const form = useForm<Category>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData
  });

  const handleSubmit = async (data: Category) => {
    try {
      const res = await mutateAsync(data);
      toast.success(res.message);
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Thử lại sau ít phút");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input placeholder="Tên danh mục" {...field} />
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
                  <Input
                    placeholder="Ngân sách"
                    type="number"
                    inputMode="numeric"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea placeholder="Mô tả" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Đang lưu..." : "Lưu"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
