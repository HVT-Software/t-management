import type { inferRouterOutputs } from "@trpc/server";

import { baseRouter } from "./trpc";
import { categoryApiRouter } from "./routes/category.api";
import { transactionApiRouter } from "./routes/transaction.api";

export const apiRouter = baseRouter({
  category: categoryApiRouter,
  transaction: transactionApiRouter
});

export type ApiRouter = typeof apiRouter;
export type ApiRouterOutput = inferRouterOutputs<ApiRouter>;
