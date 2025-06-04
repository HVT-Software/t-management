import { z } from "zod";

export type Category = z.infer<typeof categorySchema>;

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: "Tên danh mục phải có ít nhất 2 ký tự."
  }),
  description: z.string().optional(),
  budget: z.number().optional(),
  createdAt: z.string().optional(),
  remaining: z.number().optional()
});
