import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Toaster } from "react-hot-toast";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "BrandLocus Limited",
  description: "BrandLocus Limited Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
        <Toaster position="top-right" containerStyle={{ zIndex: 99999 }} />
        <GoogleAnalytics gaId="G-KT5T5VKHDN" />
      </body>
    </html>
  );
}