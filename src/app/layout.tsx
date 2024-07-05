import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Undetectable.ai",
  description: "A dead simple AI generated content detector",
};

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  return (
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
  );
}
export default Layout
