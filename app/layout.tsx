import type { Metadata } from "next";
import { Inter, Geist_Mono, EB_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "ozenstudio | Creative Studio",
  description:
    "Expressive websites and visual design for artists, creators, and early brands. Minimal, clear, and crafted with taste.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${inter.className} ${geistMono.variable} ${ebGaramond.variable} antialiased min-h-screen overflow-x-hidden bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
