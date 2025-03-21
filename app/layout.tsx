import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "HoTa",
  description: "HoTa is a platform for supporting the development of the Hota community."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CookiesProvider>
          <Providers>{children}</Providers>
        </CookiesProvider>
      </body>
    </html>
  );
}
