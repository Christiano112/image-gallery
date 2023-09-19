import { Session } from "@supabase/auth-helpers-react";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import CustomLayout from "./custom_layout";
import "./globals.css";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChrixGallery",
  description: "An image gallery with drag and drop functionality",
};

interface LayoutProps {
  children: ReactNode;
  initialSession: Session;
}

export default function RootLayout({ children, initialSession }: LayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} m-0 p-0 box-border scroll-smooth`}>
        <CustomLayout initialSession={initialSession}>{children}</CustomLayout>
      </body>
    </html>
  );
}
