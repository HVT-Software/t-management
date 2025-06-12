import { getQueryClient } from '@config/get-query-client';
import { createHydrationHelpers } from '@trpc/react-query/rsc';
import { cache } from 'react';
import 'server-only';

import { apiRouter, type ApiRouter } from './router';
import { createCallerFactory, createTRPCContext } from './trpc';

export const getTRPCQueryClient = cache(getQueryClient);

const caller = createCallerFactory(apiRouter)(createTRPCContext);

export const { trpc: trpcServer, HydrateClient } = createHydrationHelpers<ApiRouter>(caller, getTRPCQueryClient);
