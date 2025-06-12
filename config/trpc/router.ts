import { categoryApiRouter } from '@modules/category/category.api';
import type { inferRouterOutputs } from '@trpc/server';

import { baseRouter } from './init';

export const apiRouter = baseRouter({
  category: categoryApiRouter
});

export type ApiRouter = typeof apiRouter;
export type ApiRouterOutput = inferRouterOutputs<ApiRouter>;
