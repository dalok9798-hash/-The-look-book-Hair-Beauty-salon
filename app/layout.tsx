import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Look Book Salon | Luxury Hair, Beauty & Bridal Studio Panjim, Goa",
  description: "Experience absolute luxury at The Look Book Hair & Beauty Salon, Panjim, Goa. Premium Haircuts, French Balayage, Keratin, 24K Gold Facials, and Signature Destination HD Bridal Makeup with real-time AI styling simulator.",
  keywords: [
    "Best Salon in Panjim",
    "Hair Salon Goa",
    "Beauty Salon Panjim",
    "Bridal Makeup Goa",
    "Hair Colour Goa",
    "Keratin Treatment Goa",
    "The Look Book Goa",
    "Salon near Altinho",
  ],
  authors: [{ name: "The Look Book Salon Goa" }],
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable} scroll-smooth`}>
      <body
        className="font-sans antialiased text-slate-800 bg-white selection:bg-[#FFC0CB] selection:text-slate-900"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
