import { Dayjs } from 'dayjs';
import { z } from 'zod';

const REQUIRED_NAME_MESSAGE = 'Tên danh mục không được để trống';
const INVALID_BUDGET_MESSAGE = 'Ngân sách phải là số dương';
const INVALID_REMAINING_MESSAGE = 'Số tiền còn lại phải là số không âm';

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z
    .string({
      message: REQUIRED_NAME_MESSAGE
    })
    .min(1, { message: REQUIRED_NAME_MESSAGE }),
  description: z.string().optional(),
  budget: z
    .number({
      message: INVALID_BUDGET_MESSAGE
    })
    .min(0, { message: INVALID_BUDGET_MESSAGE })
    .default(0),
  remaining: z
    .number({
      message: INVALID_REMAINING_MESSAGE
    })
    .min(0, { message: INVALID_REMAINING_MESSAGE })
    .default(0),
  createAt: z.custom<Dayjs>().optional().nullable()
});

export type Category = z.infer<typeof categorySchema>;

export const categoryDefault: Category = {
  id: undefined,
  name: '',
  description: '',
  budget: 0,
  remaining: 0,
  createAt: null
};
