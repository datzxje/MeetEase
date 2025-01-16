
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { SignUpProvider } from "@/context/SignUpContext";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MEETEASE",
  description: "Video Conference App",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ 
    children: React.ReactNode 
  }>) {
  return (
    <html lang="en">  
      <body className={`${inter.className} bg-dark-2`}>
          <SignUpProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </SignUpProvider>
      </body>
    </html>
  );
}