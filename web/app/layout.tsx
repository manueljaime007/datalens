import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DataLens | Transforme os seus dados em decisões",
  description:
    "Analise ficheiros CSV de vendas, descubra tendências e obtenha informações importantes sobre o seu negócio, tudo num só lugar.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-AO"
      className={cn(
        "h-full antialiased font-sans",
        jakarta.variable,
        geistMono.variable,
        "scroll-smooth"
      )}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
