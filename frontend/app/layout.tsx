import type { Metadata } from "next";
import { Geist, Geist_Mono, Luckiest_Guy, Mali } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const luckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
  weight: ["400"],
});

const mali = Mali({
  variable: "--font-mali",
  subsets: ["thai", "latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "SPU Freshy 69",
  description: "SPU Freshy 69",
  icons: {
    icon: "/SPU.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${luckiestGuy.variable} ${mali.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
