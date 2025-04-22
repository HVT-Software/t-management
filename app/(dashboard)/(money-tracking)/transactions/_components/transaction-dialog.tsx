"use client";
import { trpcClient } from "@/app/_trpc/client";
import { HoTaTooltip } from "@/components/shared/hota-tooltip";
import { MoneyInput } from "@/components/shared/money-input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ETransactionType, getTransactionTypeList } from "@/lib/enums/transaction-type";
import { Transaction, transactionSchema } from "@/lib/models/transaction";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { format } from "date-fns";
import { CalendarIcon, HandCoins } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface QuickEditTransactionDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  transactionId?: string;
  setTransactionId: (id?: string) => void;
  onSuccess: () => void;
}

export function QuickEditTransactionDialog({ isOpen, setIsOpen, transactionId, onSuccess }: QuickEditTransactionDialogProps) {
  const queryClient = useQueryClient();

  const { data: transaction, isFetching: isLoadTransaction } = trpcClient.transaction.get.useQuery(transactionId!, { enabled: !!transactionId });
  const form = useForm<Transaction>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: ETransactionType.EXPENSE,
      amount: 0,
      description: "",
      date: new Date()
    }
  });

  const { control, handleSubmit, reset } = form;

  const { data: categories, isLoading: isLoadingCategories } = trpcClient.category.all.useQuery();
  const saveTransaction = trpcClient.transaction.save.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: getQueryKey(trpcClient.transaction.get) });
      reset();
      onSuccess();
      setIsOpen(false);
      toast.success("Giao dịch đã được lưu thành công!");
    }
  });

  const isLoading = saveTransaction.isPending || isLoadingCategories || isLoadTransaction;
  const onSubmit = async (data: Transaction) => await saveTransaction.mutateAsync(data);

  useEffect(() => {
    console.log("transactionId", transactionId);
    if (transaction && transactionId) {
      console.log(transaction);
      reset({
        ...transaction,
        date: transaction.date ? new Date(transaction.date) : new Date()
      });
    }
  }, [transaction, transactionId, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <HoTaTooltip content="Thêm giao dịch nhanh">
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <HandCoins />
          </Button>
        </DialogTrigger>
      </HoTaTooltip>
      <DialogContent className="sm:max-w-lg sm:max-h-[80vh] overflow-auto" onInteractOutside={e => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Thêm giao dịch nhanh</DialogTitle>
          <DialogDescription>Nhập thông tin giao dịch mới của bạn. Nhấn lưu khi hoàn tất.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4 py-4">
              <FormField
                control={control}
                name="type"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Tabs value={field.value?.toString()} onValueChange={value => field.onChange(Number(value))} className="w-full">
                        <TabsList className="w-full" defaultValue={field.value?.toString()}>
                          {getTransactionTypeList().map(type => (
                            <TabsTrigger key={type.value} value={type.value.toString()}>
                              {type.label}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </Tabs>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Danh mục</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
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
                name="date"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>Ngày</FormLabel>
                      <Popover modal>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                            >
                              {field.value ? format(field.value, "dd/MM/yyyy") : <span>Chọn ngày</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 z-[100]" align="start">
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
              <MoneyInput form={form} label="Số tiền" name="amount" />
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Textarea id="description" placeholder="Nhập mô tả chi tiêu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
