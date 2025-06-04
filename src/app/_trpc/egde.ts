import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { cookies } from "next/headers";

import type { ApiRouter } from "@/app/_trpc/router";

export const proxyClient = createTRPCClient<ApiRouter>({
  links: [
    httpBatchLink({
      url: "http://127.0.0.1:3000/api/trpc",
      headers: async () => ({
        cookie: (await cookies()).toString()
      })
    })
  ]
});
