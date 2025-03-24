import { TRPCError } from "@trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { AxiosError } from "axios";

import { apiRouter } from "@app/_trpc/router";
import { createTRPCContext } from "@app/_trpc/trpc";
import { logger } from "@lib/utils/logger";

export const dynamic = "force-dynamic";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: apiRouter,
    onError: error => {
      if (error.error.cause instanceof AxiosError) {
        const axiosError = error.error.cause;
        logger.error({ error: axiosError.message, path: error.path } as any, { service: "tRPC - Axios" });
        if (axiosError.status === 401) {
          throw new TRPCError({ cause: "a", code: "UNAUTHORIZED", message: "Token invalid" });
        }
      } else {
        logger.error(error.path as any, { service: "tRPC - Axios" });
        return error;
      }
    },
    createContext: createTRPCContext
  });

export { handler as GET, handler as POST };
