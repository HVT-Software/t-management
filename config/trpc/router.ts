import type { inferRouterOutputs } from '@trpc/server';

import { baseRouter } from './trpc';

export const apiRouter = baseRouter({});

export type ApiRouter = typeof apiRouter;
export type ApiRouterOutput = inferRouterOutputs<ApiRouter>;
