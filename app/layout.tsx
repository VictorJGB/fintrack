import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// styles
import "./globals.css";
import ProvidersLayout from "@/components/layouts/providers-layout";

// components

// libs

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fintrack",
  description: "Financial managment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProvidersLayout>
          {children}
        </ProvidersLayout>
      </body>
    </html>
  );
}
