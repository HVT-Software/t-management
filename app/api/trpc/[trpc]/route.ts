import { createTRPCContext } from '@config/trpc/init';
import { apiRouter } from '@config/trpc/router';
import { logger } from '@shared/utilities/logger';
import { TRPCError } from '@trpc/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { AxiosError } from 'axios';

export const dynamic = 'force-dynamic';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: apiRouter,
    onError: (error) => {
      if (error.error.cause instanceof AxiosError) {
        const axiosError = error.error.cause;
        logger.error({ error: axiosError.message, path: error.path, details: axiosError?.response?.data } as any, {
          service: 'tRPC'
        });

        if (axiosError.status === 401) {
          throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Token invalid' });
        }

        if (axiosError.status === 400) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: axiosError.response?.data?.data?.message || 'Bad request'
          });
        }
      } else {
        logger.error(error.path as any, { service: 'tRPC' });
        return error;
      }
    },
    createContext: createTRPCContext
  });

export { handler as GET, handler as POST };
