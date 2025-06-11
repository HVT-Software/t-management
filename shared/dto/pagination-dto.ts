import { Dayjs } from 'dayjs';
import { z } from 'zod';

export const paginationDto = z.object({
  startDate: z.custom<Dayjs>().optional().nullable(),
  endDate: z.custom<Dayjs>().optional().nullable(),
  isCount: z.boolean().optional().default(true),
  isAll: z.boolean().optional().default(false),
  searchText: z.string().optional().default(''),
  pageIndex: z.number().optional().default(0),
  pageSize: z.number().optional().default(20)
});
export const paginationDtoDefault = paginationDto.parse({});

export type PaginationDto = z.infer<typeof paginationDto>;
