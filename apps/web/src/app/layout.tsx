import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Portreva - Professional AI Background Removal Platform",
  description: "Remove image backgrounds instantly with AI-powered technology. Professional quality, multiple formats, and enterprise-grade reliability.",
  keywords: "background removal, AI, image processing, remove.bg, professional, cloudinary",
  authors: [{ name: "Portreva Team" }],
  openGraph: {
    title: "Portreva - Professional AI Background Removal",
    description: "Remove image backgrounds instantly with AI-powered technology",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portreva - Professional AI Background Removal",
    description: "Remove image backgrounds instantly with AI-powered technology",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
