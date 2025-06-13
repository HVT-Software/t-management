import { categorySchema } from '@modules/category/models/category';
import { z } from 'zod';

import { ETransactionType } from './transaction-type';

export const transactionSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  type: z.nativeEnum(ETransactionType, {
    errorMap: () => ({ message: 'Loại giao dịch không hợp lệ' })
  }),
  amount: z
    .number({
      invalid_type_error: 'Số tiền phải là số',
      required_error: 'Số tiền là bắt buộc'
    })
    .min(0.01, { message: 'Số tiền phải lớn hơn 0' }),
  categoryId: z.string().optional(),
  description: z.string().max(2000, { message: 'Tối đa 2000 ký tự' }).optional(),
  date: z.date().default(() => new Date()),
  category: categorySchema.nullable().optional()
});

export type Transaction = z.infer<typeof transactionSchema>;
