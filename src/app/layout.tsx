import type { Metadata } from "next";

import { Inter } from "next/font/google";

import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`mx-auto sm:px-6 lg:px-8 ${inter.className}`}>
        {children}

        <Analytics />
      </body>
    </html>
  );
}
