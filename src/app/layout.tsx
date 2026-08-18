import type { Metadata } from "next";
import { Sora, Chakra_Petch, JetBrains_Mono } from "next/font/google";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEXARA — Engineering the Future with AI",
  description:
    "NEXARA is a future-forward AI company building autonomous systems, neural infrastructure, and intelligent platforms for the next decade.",
  keywords: [
    "AI company",
    "machine learning",
    "neural infrastructure",
    "autonomous systems",
    "future technology",
    "NEXARA",
  ],
  openGraph: {
    title: "NEXARA — Engineering the Future with AI",
    description:
      "Future-forward AI company building autonomous systems and neural infrastructure.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${chakraPetch.variable} ${jetMono.variable}`}
    >
      <body className="bg-void text-mist antialiased">
        <AnimatedBackground />
        <CursorSpotlight />
        <div className="relative z-10 flex min-h-dvh flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
