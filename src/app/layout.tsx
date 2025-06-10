import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "HoTa",
  description: "HoTa is a platform for supporting the development of the Hota community."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <CookiesProvider>
          <Providers>{children}</Providers>
        </CookiesProvider>
      </body>
    </html>
  );
}
