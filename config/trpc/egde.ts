import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { cookies } from 'next/headers';

import { ApiRouter } from './router';

export const proxyClient = createTRPCClient<ApiRouter>({
  links: [
    httpBatchLink({
      url: 'http://127.0.0.1:4400/management/api/trpc',
      headers: async () => ({
        cookie: (await cookies()).toString()
      })
    })
  ]
});
