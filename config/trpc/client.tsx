'use client';

import { loginPath } from '@app/routes';
import { devalueTransformer } from '@config/trpc/transformer';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createTRPCClient, httpLink } from '@trpc/client';
import { createTRPCContext } from '@trpc/tanstack-react-query';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

import { getQueryClient } from './query-client';
import type { ApiRouter } from './router';

export const { TRPCProvider, useTRPC } = createTRPCContext<ApiRouter>();
function getUrl() {
  const base = (() => {
    if (typeof window !== 'undefined') return '';
    return 'http://localhost:4700';
  })();
  return `${base}/api/trpc`;
}
export function QueryProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<ApiRouter>({
      links: [
        httpLink({
          url: getUrl(),
          transformer: devalueTransformer,
          fetch: async (url, options) => {
            const response = await fetch(url, {
              ...options,
              credentials: 'same-origin'
            });

            if (response.status === 401) {
              await signOut({ redirect: true, callbackUrl: loginPath });
            }

            return response;
          }
        })
      ]
    })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {props.children}
      </TRPCProvider>
      <ReactQueryDevtools buttonPosition='bottom-right' />
    </QueryClientProvider>
  );
}
