import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster"; 
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
            <Toaster />
          </AuthProvider>
        </SignUpProvider>
      </body>
    </html>
  );
}