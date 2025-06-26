import { serverInstance } from '@config/axios-clients/server-instance';
import { createTRPCRouter, protectedProcedure } from '@config/trpc/trpc';
import { DEFAULT_ERROR_MESSAGE } from '@shared/constants/messages';
import { CLOUD_CATEGORY_ENDPOINT } from '@shared/constants/routes.api';
import { z } from 'zod';
import { Category } from './models/category';
import { CategoryFilter } from './models/category-filter';

export const categoryApiRouter = createTRPCRouter({
  all: protectedProcedure.query<Array<Category>>(async () => {
    try {
      const res = await serverInstance.post<Result<WrapList<Category>>>(`${CLOUD_CATEGORY_ENDPOINT}/list`, {
        isAll: true,
        hasRemaining: true
      });
      return res.data.data.items;
    } catch (e) {
      console.error(e);
      return [];
    }
  }),

  list: protectedProcedure.input(z.custom<CategoryFilter>()).query<WrapList<Category>>(async ({ input }) => {
    const res = await serverInstance.post<Result<WrapList<Category>>>(`${CLOUD_CATEGORY_ENDPOINT}/list`, {
      ...input,
      hasRemaining: true
    });
    console.log(res);
    return res.data.data;
  }),

  get: protectedProcedure.input(z.string().optional()).query<Category | null>(async ({ input: id }) => {
    const res = await serverInstance.get<Result<Category>>(`${CLOUD_CATEGORY_ENDPOINT}/${id}`);
    return res.data.data ?? null;
  }),

  save: protectedProcedure.input(z.custom<Category>()).mutation(async ({ input }) => {
    const res = input?.id
      ? await serverInstance.put<Result<string>>(`${CLOUD_CATEGORY_ENDPOINT}/${input.id}`, input)
      : await serverInstance.post<Result<string>>(CLOUD_CATEGORY_ENDPOINT, input);

    if (res.data.success) {
      return {
        ...res.data,
        success: true,
        message: input?.id ? 'Cập nhật nhóm chi tiêu thành công' : 'Thêm nhóm chi tiêu thành công'
      };
    }
    return {
      success: false,
      data: '',
      message: res.data.message ?? DEFAULT_ERROR_MESSAGE
    };
  }),

  delete: protectedProcedure.input(z.string()).mutation(async ({ input: id }) => {
    await serverInstance.delete<Result<string>>(`${CLOUD_CATEGORY_ENDPOINT}/${id}`);
    return {
      success: true,
      message: 'Xóa nhóm chi tiêu thành công'
    };
  })
});
