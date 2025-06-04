"use client";

import { getUrl, trpcClient } from "@/app/_trpc/client";
import { QueryProvider } from "@/components/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { otherKeys } from "@/config/cookie-keys";
import { loginPath } from "@/config/routes";
import { getQueryClient } from "@/app/_queries/base/get-query-client";
import { getTimeZone } from "@/utils/get-timezone";
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
            <QueryProvider queryClient={queryClient}>
              <NuqsAdapter>{children}</NuqsAdapter>
              <Init />
              <Toaster richColors position="top-right" />
            </QueryProvider>
          </SessionProvider>
        </QueryProvider>
      </trpcClient.Provider>
    </ThemeProvider>
  );
}
