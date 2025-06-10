import { devalueTransformer } from '@config/trpc/transformer';
import { initTRPC } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

export const createTRPCContext = (options?: FetchCreateContextFnOptions) => {
  return {
    isServerCall: !options?.req
  };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: devalueTransformer
});
// Base router and procedure helpers
export const baseRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const apiProcedure = t.procedure;
