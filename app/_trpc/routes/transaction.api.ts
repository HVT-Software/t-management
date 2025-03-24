import { z } from "zod";
import { CLOUD_TRANSACTION_ENDPOINT } from "./../../../lib/constants/cloud-endpoint";

import { baseRouter, procedure } from "@app/_trpc";

import { TransactionFilter } from "@app/(dashboard)/(money-tracking)/transactions/_model/transaction-filter";
import { filterKeys } from "@lib/constants/cookie-keys";
import { DEFAULT_ERROR_MESSAGE } from "@lib/constants/messages";
import { Transaction } from "@lib/models/transaction";
import { serverInstance } from "@lib/query/server-instance";
import { saveToCookie } from "@lib/utils/cookie-helper";

export const transactionApiRouter = baseRouter({
  list: procedure.input(z.custom<TransactionFilter>()).query<WrapList<Transaction>>(async ({ input, ctx }) => {
    const res = await serverInstance.get<Result<WrapList<Transaction>>>(CLOUD_TRANSACTION_ENDPOINT, { params: input });

    if (!ctx.isServerCall) {
      await saveToCookie<TransactionFilter>(filterKeys.TRANSACTION_FILTER, input);
    }

    return res.data.data;
  }),

  get: procedure.input(z.string()).query<Transaction | null>(async ({ input: id }) => {
    try {
      const res = await serverInstance.get<Result<Transaction>>(`${CLOUD_TRANSACTION_ENDPOINT}/${id}`);
      return res.data.data ?? null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }),

  save: procedure.input(z.custom<Transaction>()).mutation(async ({ input }) => {
    try {
      const res = input?.id
        ? await serverInstance.put<Result<Transaction>>(`${CLOUD_TRANSACTION_ENDPOINT}/${input.id}`, input)
        : await serverInstance.post<Result<Transaction>>(CLOUD_TRANSACTION_ENDPOINT, input);
      if (res.data.success) {
        return {
          ...res.data,
          success: true,
          message: input?.id ? "Cập nhật giao dịch thành công" : "Thêm giao dịch thành công"
        };
      }
      return {
        success: false,
        data: "",
        message: res.data.message ?? DEFAULT_ERROR_MESSAGE
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        data: "",
        message: DEFAULT_ERROR_MESSAGE
      };
    }
  }),

  delete: procedure.input(z.string()).mutation(async ({ input: id }) => {
    try {
      const res = await serverInstance.delete<Result<string>>(`${CLOUD_TRANSACTION_ENDPOINT}/${id}`);
      if (res.data.success) {
        return {
          success: true,
          data: res.data.data,
          message: "Xóa giao dịch thành công!"
        };
      }
      return {
        success: false,
        data: res.data.data,
        message: res.data.message ?? "Xóa giao dịch thất bại!"
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
