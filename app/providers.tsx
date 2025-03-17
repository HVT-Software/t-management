"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { TanstackProvider } from "@/lib/query/providers";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider basePath="/api/auth">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <TanstackProvider>
          {children}
          <Toaster richColors position="top-right" />
        </TanstackProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
