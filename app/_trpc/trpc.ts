import { initTRPC } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import "server-only";

export const createTRPCContext = (options?: FetchCreateContextFnOptions) => {
  return {
    isServerCall: !options?.req
  };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const trpc = initTRPC.context<Context>().create();

export const baseRouter = trpc.router;
export const procedure = trpc.procedure;

export const createCallerFactory = trpc.createCallerFactory;
