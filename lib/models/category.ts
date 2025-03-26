import { z } from "zod";

export type Category = z.infer<typeof categorySchema>;

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters."
  }),
  description: z.string().optional(),
  budget: z.number().optional()
});
