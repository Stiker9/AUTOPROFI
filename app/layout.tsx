import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | AUTOPROFI — Фаркопы",
    default: "AUTOPROFI — Фаркопы: продажа и установка",
  },
  description:
    "Продажа и профессиональная установка фаркопов. Подбор по марке, модели и году автомобиля.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="font-body bg-bg-primary text-white flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
