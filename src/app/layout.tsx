import type { Metadata } from "next";
import localFont from "next/font/local";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ProtectedRoutes from "./ProtectedRoutes";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Resolvi",
  description: "Seu problema resolvido!",
  icons: '/img/favicon.ico'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${leagueSpartan.className} antialiased`}
      >
        <ProtectedRoutes>{children}</ProtectedRoutes>
        <Toaster />
      </body>
    </html>
  );
}
