import { z } from "zod";

import { baseRouter, procedure } from "@/app/_trpc";

import { CategoryFilter } from "@/app/(dashboard)/(money-tracking)/transactions/_lib/category-validations";
import { CLOUD_CATEGORY_ENDPOINT } from "@/lib/constants/cloud-endpoint";
import { DEFAULT_ERROR_MESSAGE } from "@/lib/constants/messages";
import { Category } from "@/lib/models/category";
import { serverInstance } from "@/lib/query/server-instance";

export const categoryApiRouter = baseRouter({
  all: procedure.query<Array<Category>>(async () => {
    const res = await serverInstance.get<Result<WrapList<Category>>>(CLOUD_CATEGORY_ENDPOINT, { params: { isAll: true } });
    return res.data.data.items;
  }),

  list: procedure.input(z.custom<CategoryFilter>()).query<WrapList<Category>>(async ({ input }) => {
    const res = await serverInstance.get<Result<WrapList<Category>>>(CLOUD_CATEGORY_ENDPOINT, { params: input });
    return res.data.data;
  }),

  get: procedure.input(z.string()).query<Category | null>(async ({ input: id }) => {
    try {
      const res = await serverInstance.get<Result<Category>>(`${CLOUD_CATEGORY_ENDPOINT}/${id}`);
      return res.data.data ?? null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }),

  save: procedure.input(z.custom<Category>()).mutation(async ({ input }) => {
    try {
      const res = await serverInstance.post<Result<string>>(CLOUD_CATEGORY_ENDPOINT, input);
      if (res.data.success) {
        return {
          ...res.data,
          success: true,
          message: input?.id ? "Cập nhật nhóm chi tiêu thành công" : "Thêm nhóm chi tiêu thành công"
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
      const res = await serverInstance.delete<Result<string>>(`${CLOUD_CATEGORY_ENDPOINT}/${id}`);
      if (res.data.success) {
        return {
          success: true,
          data: res.data.data,
          message: "Xóa nhóm chi tiêu thành công!"
        };
      }
      return {
        success: false,
        data: res.data.data,
        message: res.data.message ?? "Xóa nhóm chi tiêu thất bại!"
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
