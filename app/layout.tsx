import { beVietnamPro } from '@config/fonts';
import { ThemeRegistry } from '@config/theme';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import type { Metadata, Viewport } from 'next';
import { CookiesProvider } from 'next-client-cookies/server';

import './global.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'TMS',
  description: 'Powered by FMS'
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
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${beVietnamPro.variable} min-h-[100svh] scroll-mt-[64px] overflow-x-hidden overflow-y-auto antialiased`}
      >
        <InitColorSchemeScript attribute="[data-theme='%s']" />
        <ThemeRegistry>
          <CookiesProvider>
            <Providers>{children}</Providers>
          </CookiesProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
