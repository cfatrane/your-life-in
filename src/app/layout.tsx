import type { Metadata } from "next";

import { Inter } from "next/font/google";

import { Analytics } from "@vercel/analytics/react";

import Footer from "@/components/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Life In Weeks",
  description: "Your Life In Weeks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <TooltipProvider delayDuration={300}>
          <main>{children}</main>

          <Footer />
        </TooltipProvider>

        <Analytics />
      </body>
    </html>
  );
}
