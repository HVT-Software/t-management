import type { inferRouterOutputs } from "@trpc/server";

import { baseRouter } from "./trpc";
import { categoryApiRouter } from "./_apis/category.api";

export const apiRouter = baseRouter({
  category: categoryApiRouter
});

export type ApiRouter = typeof apiRouter;
export type ApiRouterOutput = inferRouterOutputs<ApiRouter>;
