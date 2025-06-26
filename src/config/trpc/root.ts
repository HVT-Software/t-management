import { categoryApiRouter } from '@modules/category/category.api';
import { parse, stringify } from 'devalue';
import { createCallerFactory, createTRPCRouter } from './trpc';
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  category: categoryApiRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

export const devalueTransformer = {
  serialize: (data: any) => stringify(data),
  deserialize: (data: any) => parse(data)
};
