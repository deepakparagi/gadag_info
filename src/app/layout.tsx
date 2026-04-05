import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";
import Navbar from "@/components/ui/Navbar";
import ThemeProvider from "@/components/ThemeProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

import Footer from "@/components/ui/Footer";
import Preloader from "@/components/ui/Preloader";

export const metadata: Metadata = {
  title: "GADAG INFO — Soul of North Karnataka",
  description:
    "A premium cultural showcase and storytelling platform celebrating Gadag's heritage, community, and vibrant culture. 114K+ voices strong.",
  keywords: [
    "Gadag",
    "North Karnataka",
    "Heritage",
    "Culture",
    "Community",
    "Temples",
    "Chalukya",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-lang="EN"
      className={`${cormorant.variable} ${dmMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="antialiased overflow-x-hidden block">
        <ThemeProvider>
          <Preloader />
          <SmoothScroller>
            <div className="relative z-10 w-full">
              <Navbar />
              <main className="min-h-screen">{children}</main>
              <Footer />
            </div>
          </SmoothScroller>
        </ThemeProvider>
      </body>
    </html>
  );
}
