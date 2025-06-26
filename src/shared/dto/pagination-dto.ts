import { Dayjs } from 'dayjs';
import { z } from 'zod';

export enum SortDirection {
  None = 0,
  Asc = 1,
  Desc = 2
}

const sortDto = z.object({
  sortDirection: z.nativeEnum(SortDirection).default(SortDirection.None),
  sortPropertyName: z.string().default('')
});

export type SortDto = z.infer<typeof sortDto>;

export const paginationDto = z.object({
  from: z.custom<Dayjs>().optional().nullable(),
  to: z.custom<Dayjs>().optional().nullable(),
  isCount: z.boolean().optional().default(true),
  isAll: z.boolean().optional().default(false),
  searchText: z.string().optional().default(''),
  pageIndex: z.number().optional().default(0),
  pageSize: z.number().optional().default(20),
  sort: sortDto.optional().default({
    sortDirection: SortDirection.None,
    sortPropertyName: ''
  })
});
export const paginationDtoDefault = paginationDto.parse({});

export type PaginationDto = z.infer<typeof paginationDto>;
