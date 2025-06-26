import { beVietnamPro } from '@config/fonts';
import { ThemeRegistry } from '@config/theme';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import type { Metadata, Viewport } from 'next';
import { CookiesProvider } from 'next-client-cookies/server';

import './global.css';
import { TRPCReactProvider } from '@config/trpc/react';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Quản lý chi tiêu',
  description: ''
};

export const viewport: Viewport = {
  maximumScale: 1,
  initialScale: 1,
  width: 'device-width',
  userScalable: false
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='vi' suppressHydrationWarning>
      <body
        className={`${beVietnamPro.variable} min-h-[100svh] scroll-mt-[64px] overflow-x-hidden overflow-y-auto antialiased`}
      >
        <InitColorSchemeScript attribute="[data-theme='%s']" />
        <ThemeRegistry>
          <CookiesProvider>
            <TRPCReactProvider>
              <Providers>{children}</Providers>
            </TRPCReactProvider>
          </CookiesProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
