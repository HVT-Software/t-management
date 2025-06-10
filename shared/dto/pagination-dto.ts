import { SortDirection } from '@integration/model_pb';
import { Dayjs } from 'dayjs';
import { z } from 'zod';

const sortDto = z.object({
  sortDirection: z.nativeEnum(SortDirection).default(SortDirection.None),
  sortPropertyName: z.string().default('')
});

export type SortDto = z.infer<typeof sortDto>;

export const paginationDto = z.object({
  startDate: z.custom<Dayjs>().optional().nullable(),
  endDate: z.custom<Dayjs>().optional().nullable(),
  isCount: z.boolean().optional().default(true),
  isAll: z.boolean().optional().default(false),
  searchText: z.string().optional().default(''),
  sort: sortDto.optional().default({
    sortDirection: SortDirection.None,
    sortPropertyName: ''
  }),
  pageIndex: z.number().optional().default(0),
  pageSize: z.number().optional().default(20)
});
export const paginationDtoDefault = paginationDto.parse({});

export type PaginationDto = z.infer<typeof paginationDto>;
