"use client";

import { trpcClient } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Transaction } from "@/types/transaction/transaction";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export function TransactionForm() {
  const { data: categories, isLoading: isLoadingCategories } = trpcClient.category.all.useQuery();
  const saveTransaction = trpcClient.transaction.save.useMutation({
    onSuccess: () => {
      reset({});
      toast.success("Giao dịch đã được lưu thành công!");
    },
    onError: error => {
      console.error("Error saving transaction:", error);
    }
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Transaction>({
    resolver: classValidatorResolver(Transaction)
  });

  // Handle form submission
  const onSubmit = async (data: Transaction) => {
    await saveTransaction.mutateAsync(data);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Thêm chi tiêu mới</CardTitle>
        <CardDescription>Nhập thông tin chi tiêu của bạn</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Loại giao dịch</Label>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value.toString()} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="expense" />
                    <Label htmlFor="expense">Chi tiêu</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="income" />
                    <Label htmlFor="income">Thu nhập</Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Số tiền</Label>
            <Input id="amount" type="number" placeholder="Nhập số tiền" {...register("amount")} />
            {errors.amount && <p className="text-sm text-destructive">{errors.amount.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Danh mục</Label>
            <Controller
              control={control}
              name="categoryId"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map(category => (
                      <SelectItem key={category.id} value={category.id!}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.categoryId && <p className="text-sm text-destructive">{errors.categoryId.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea id="description" placeholder="Nhập mô tả chi tiêu" {...register("description")} />
            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Ngày</Label>
            <Controller
              control={control}
              name="date"
              render={({ field }) => {
                const date = new Date(field.value);
                return (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(date, "dd/MM/yyyy", { locale: vi }) : <span>Chọn ngày</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                );
              }}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting || saveTransaction.isPending}>
            {saveTransaction.isPending || isLoadingCategories ? "Đang lưu..." : "Lưu"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
