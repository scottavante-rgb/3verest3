import type { Metadata } from "next";
import { Inter, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";
import ThemeTransitionWrapper from "@/components/ui/theme-transition-wrapper";
import SmoothScroll from "@/components/ui/smooth-scroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "3verest - Sovereign Cloud. Reinvented.",
  description: "Sovereign Cloud Infrastructure for Healthcare. The future of secure, intelligent cloud computing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${montserrat.variable} antialiased`}
      >
        <ThemeProvider>
          <ThemeTransitionWrapper>
            <SmoothScroll />
            {children}
          </ThemeTransitionWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
