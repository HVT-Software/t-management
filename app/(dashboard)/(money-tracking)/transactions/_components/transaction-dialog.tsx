"use client";
import { trpcClient } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ETransactionType } from "@/lib/enums/transaction-type";
import { Transaction, transactionSchema } from "@/lib/models/transaction";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { CalendarIcon, HandCoins } from "lucide-react";
import { useForm } from "react-hook-form";

interface QuickEntryDialogProps {
  onTransactionAdded: () => void;
}

export function QuickEditTransactionDialog({ onTransactionAdded }: QuickEntryDialogProps) {
  const { data: categories, isLoading: isLoadingCategories } = trpcClient.category.all.useQuery();
  const saveTransaction = trpcClient.transaction.save.useMutation({
    onSuccess: () => {
      reset();
      onTransactionAdded();
    },
    onError: error => {
      console.error("Error saving transaction:", error);
    }
  });

  const form = useForm<Transaction>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: ETransactionType.EXPENSE,
      amount: 0,
      categoryId: "",
      description: "",
      date: new Date()
    }
  });

  const { control, handleSubmit, reset } = form;
  const isLoading = saveTransaction.isPending || isLoadingCategories;

  // Handle form submission
  const onSubmit = (data: Transaction) => {
    console.log(data);
    // saveTransaction.mutateAsync(data);
  };

  return (
    <Dialog open>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <HandCoins />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg sm:max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Thêm giao dịch nhanh</DialogTitle>
          <DialogDescription>Nhập thông tin giao dịch mới của bạn. Nhấn lưu khi hoàn tất.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={control}
                name="type"
                render={({ field }) => (
                  <Tabs defaultValue="expense" className="w-full">
                    <TabsList className="w-full" onChange={field.onChange} defaultValue={field.value}>
                      <TabsTrigger value="expense">Chi tiêu</TabsTrigger>
                      <TabsTrigger value="income">Thu nhập</TabsTrigger>
                    </TabsList>
                  </Tabs>
                )}
              />

              <FormField
                control={control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số tiền</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Nhập số tiền"
                        {...field}
                        value={field.value}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Danh mục</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Textarea id="description" placeholder="Nhập mô tả chi tiêu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="date"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>Ngày</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={date => date > new Date() || date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onClick={() => reset()} disabled={isLoading}>
                  Hủy
                </Button>
              </DialogClose>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Đang lưu..." : "Lưu"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
