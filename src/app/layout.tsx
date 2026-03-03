import type { Metadata } from "next";

import { Inter } from "next/font/google";

import { Analytics } from "@vercel/analytics/react";

import { Footer } from "@/components/layout/footer";

import { APP_CONFIG } from "@/config/app-config";

import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: APP_CONFIG.description,
  title: APP_CONFIG.title,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main>{children}</main>

          <Footer />
        </Providers>

        <Analytics />
      </body>
    </html>
  );
}
