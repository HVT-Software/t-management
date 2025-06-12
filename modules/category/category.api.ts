import { apiProcedure, baseRouter } from '@config/trpc/init';
import { serverInstance } from '@config/trpc/server-instance';
import { DEFAULT_ERROR_MESSAGE } from '@shared/constants/messages';
import { CLOUD_CATEGORY_ENDPOINT } from '@shared/constants/routes.api';
import { z } from 'zod';

import { Category } from './models/category';
import { CategoryFilter } from './models/category-filter';

export const categoryApiRouter = baseRouter({
  all: apiProcedure.query<Array<Category>>(async () => {
    const res = await serverInstance.post<Result<WrapList<Category>>>(`${CLOUD_CATEGORY_ENDPOINT}/list`, {
      isAll: true,
      hasRemaining: true
    });
    return res.data.data.items;
  }),

  list: apiProcedure.input(z.custom<CategoryFilter>()).query<WrapList<Category>>(async ({ input }) => {
    const res = await serverInstance.post<Result<WrapList<Category>>>(`${CLOUD_CATEGORY_ENDPOINT}/list`, {
      ...input,
      hasRemaining: true
    });

    return res.data.data;
  }),

  get: apiProcedure.input(z.string()).query<Category | null>(async ({ input: id }) => {
    try {
      const res = await serverInstance.get<Result<Category>>(`${CLOUD_CATEGORY_ENDPOINT}/${id}`);
      return res.data.data ?? null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }),

  save: apiProcedure.input(z.custom<Category>()).mutation(async ({ input }) => {
    try {
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
    } catch (e) {
      console.error(e);
      return {
        success: false,
        data: '',
        message: DEFAULT_ERROR_MESSAGE
      };
    }
  }),

  delete: apiProcedure.input(z.string()).mutation(async ({ input: id }) => {
    try {
      const res = await serverInstance.delete<Result<string>>(`${CLOUD_CATEGORY_ENDPOINT}/${id}`);
      if (res.data.success) {
        return {
          success: true,
          data: res.data.data,
          message: 'Xóa nhóm chi tiêu thành công!'
        };
      }

      return {
        success: false,
        data: res.data.data,
        message: res.data.message ?? 'Xóa nhóm chi tiêu thất bại!'
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        data: undefined,
        message: DEFAULT_ERROR_MESSAGE
      };
    }
  })
});
