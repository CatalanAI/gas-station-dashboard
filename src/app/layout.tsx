import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Catalan.ai Dashboard",
  description: "SaaS dashboard for gas station pricing and metrics with Apple Fitness-style cards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased font-sans min-h-screen bg-gray-50`}
      >
        {children}
      </body>
    </html>
  );
}
