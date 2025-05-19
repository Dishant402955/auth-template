import type { Metadata } from "next";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  title: "Auth.js Template",
  description: "An Authentication Template with OAuth, 2 Factor Authentication, Role-Based Access and much more ...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
