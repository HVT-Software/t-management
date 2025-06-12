import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import { cache } from 'react';
import 'server-only';

import { createTRPCContext } from './init';
import { makeQueryClient } from './query-client';
import { apiRouter } from './router';

export const getQueryClient = cache(makeQueryClient);

export const trpcServer = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: apiRouter,
  queryClient: getQueryClient
});
