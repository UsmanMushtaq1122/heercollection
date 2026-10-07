import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond, Cinzel, Montserrat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Heer Collection | Premium Luxury Women's Fashion",
    template: "%s | Heer Collection",
  },
  description:
    "Discover exquisite luxury women's fashion at Heer Collection. Premium pret, formal wear, and summer collections crafted with timeless elegance.",
  keywords: [
    "luxury fashion",
    "women's clothing",
    "luxury pret",
    "designer wear",
    "Pakistani fashion",
    "formal wear",
    "summer collection",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Heer Collection",
    title: "Heer Collection | Premium Luxury Women's Fashion",
    description:
      "Discover exquisite luxury women's fashion at Heer Collection.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heer Collection | Premium Luxury Women's Fashion",
    description:
      "Discover exquisite luxury women's fashion at Heer Collection.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import AuthProvider from "@/components/auth/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${cinzel.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8F5F2] text-[#1A1A1A]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
