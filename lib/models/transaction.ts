import { z } from "zod";
import { ETransactionType } from "../enums/transaction-type";
import { categorySchema } from "./category";

export const transactionSchema = z.object({
  id: z.string().optional().default(""),
  userId: z.string().optional(),
  type: z.nativeEnum(ETransactionType),
  amount: z.number({ message: "Số tiền không được để trống" }).refine(val => val > 0, { message: "Số tiền phải lớn hơn 0" }),
  categoryId: z.string({ message: "Vui lòng chọn danh mục" }),
  description: z.string().max(2000, "Tối đa 2000 ký tự").optional(),
  date: z
    .date()
    .refine(
      date => {
        const currentDate = new Date();
        return date <= currentDate;
      },
      {
        message: "Ngày không được là ngày tương lai"
      }
    )
    .default(() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today;
    }),
  category: z.object(categorySchema.shape).optional().nullable()
});

// Define the form data type from the schema
export type Transaction = z.infer<typeof transactionSchema>;
