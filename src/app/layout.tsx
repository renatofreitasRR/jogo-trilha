import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
    <html lang="pt-br">
      <body style={{
        margin: 0,
        padding: 0,
      }}>{children}</body>
    </html>
  );
}
