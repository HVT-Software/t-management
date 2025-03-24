"use client";

import { getUrl, trpcClient } from "@app/_trpc/client";
import { QueryProvider } from "@components/query-provider";
import { ThemeProvider } from "@components/theme-provider";
import { otherKeys } from "@lib/constants/cookie-keys";
import { loginPath } from "@lib/constants/routes";
import { getQueryClient } from "@lib/query/get-query-client";
import { TanstackProvider } from "@lib/query/providers";
import { getTimeZone } from "@lib/utils/get-timezone";
import { httpLink } from "@trpc/client";
import { SessionProvider, signOut } from "next-auth/react";
import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

interface ProvidersProps {
  children: React.ReactNode;
}

const Init = () => {
  const cookies = useCookies();
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    cookies.set(otherKeys.TIMEZONE_COOKIE_NAME, getTimeZone(), {
      sameSite: "lax"
    });
  }, [cookies]);
  return null;
};

export function Providers({ children }: ProvidersProps) {
  const queryClient = getQueryClient();
  const [client] = useState(() =>
    trpcClient.createClient({
      links: [
        httpLink({
          url: getUrl(),
          fetch: async (url, options) => {
            const response = await fetch(url, {
              ...options,
              credentials: "include"
            });

            if (response.status === 401) {
              await signOut({ redirect: false, callbackUrl: loginPath });
              window.location.replace(loginPath);
            }

            return response;
          }
        })
      ]
    })
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <trpcClient.Provider client={client} queryClient={queryClient}>
        <QueryProvider queryClient={queryClient}>
          <SessionProvider basePath="/api/auth">
            <TanstackProvider>
              <NuqsAdapter>{children}</NuqsAdapter>
              <Init />
              <Toaster richColors position="top-right" />
            </TanstackProvider>
          </SessionProvider>
        </QueryProvider>
      </trpcClient.Provider>
    </ThemeProvider>
  );
}
