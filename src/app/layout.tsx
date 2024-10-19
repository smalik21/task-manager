import type { Metadata } from "next";
import "./globals.css";

import { inter } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Task Manager | Manage all your tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
