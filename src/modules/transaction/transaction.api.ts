import { serverInstance } from '@config/axios-clients/server-instance';
import { DEFAULT_ERROR_MESSAGE } from '@shared/constants/messages';
import { CLOUD_TRANSACTION_ENDPOINT } from '@shared/constants/routes.api';
import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@config/trpc/trpc';
import { Transaction } from './models/transaction';
import { TransactionFilter } from './models/transaction-filter';

export const transactionApiRouter = createTRPCRouter({
  list: protectedProcedure.input(z.custom<TransactionFilter>()).query<WrapList<Transaction>>(async ({ input }) => {
    const res = await serverInstance.post<Result<WrapList<Transaction>>>(`${CLOUD_TRANSACTION_ENDPOINT}/list`, input);
    return res.data.data;
  }),

  get: protectedProcedure.input(z.string()).query<Transaction | null>(async ({ input: id }) => {
    try {
      const res = await serverInstance.get<Result<Transaction>>(`${CLOUD_TRANSACTION_ENDPOINT}/${id}`);
      return res.data.data ?? null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }),

  save: protectedProcedure.input(z.custom<Transaction>()).mutation(async ({ input }) => {
    try {
      const res = input?.id
        ? await serverInstance.put<Result<Transaction>>(`${CLOUD_TRANSACTION_ENDPOINT}/${input.id}`, input)
        : await serverInstance.post<Result<Transaction>>(CLOUD_TRANSACTION_ENDPOINT, input);
      if (res.data.success) {
        return {
          ...res.data,
          success: true,
          message: input?.id ? 'Cập nhật giao dịch thành công' : 'Thêm giao dịch thành công'
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

  delete: protectedProcedure.input(z.string()).mutation(async ({ input: id }) => {
    try {
      const res = await serverInstance.delete<Result<string>>(`${CLOUD_TRANSACTION_ENDPOINT}/${id}`);
      if (res.data.success) {
        return {
          success: true,
          data: res.data.data,
          message: 'Xóa giao dịch thành công!'
        };
      }
      return {
        success: false,
        data: res.data.data,
        message: res.data.message ?? 'Xóa giao dịch thất bại!'
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
