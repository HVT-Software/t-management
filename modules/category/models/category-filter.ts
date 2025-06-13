import { paginationDto } from '@shared/dto/pagination-dto';
import { z } from 'zod';

export const categoryFilter = paginationDto.extend({});

export type CategoryFilter = z.infer<typeof categoryFilter>;

export const categoryFilterDefault: CategoryFilter = categoryFilter.parse({});
