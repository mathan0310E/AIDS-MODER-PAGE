import type { Metadata } from "next";
import { Space_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI & Data Science · SKP Engineering College",
  description:
    "B.Tech Artificial Intelligence & Data Science at SKP Engineering College — affiliated to Anna University, approved by AICTE. Learn, build, innovate, lead.",
  keywords: [
    "SKP Engineering College",
    "AI & Data Science",
    "B.Tech AI DS",
    "Anna University",
    "Artificial Intelligence",
    "Data Science",
    "Tiruvannamalai",
  ],
  openGraph: {
    title: "AI & Data Science · SKP Engineering College",
    description:
      "B.Tech Artificial Intelligence & Data Science — where curious minds learn to build intelligent systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${instrumentSerif.variable} ${jetMono.variable}`}
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
