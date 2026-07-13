import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "900"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hoodini.hu"),
  title: {
    default: "Hoodini – Prémium Streetwear & Hoodiék",
    template: "%s | Hoodini",
  },
  description:
    "Fedezd fel a Hoodini prémium streetwear kollekcióját. Egyedi hoodiék, pólók és kiegészítők gyors kiszállítással, 30 napos visszaküldési garanciával.",
  keywords: [
    "balaclava hoodie",
    "balaclava kapucnis pulóver",
    "hoodie",
    "streetwear",
    "ruházat",
    "divat",
    "prémium",
    "webshop",
    "hoodini",
  ],
  icons: {
    icon: "/favicon.svg?v=1",
    shortcut: "/favicon.svg?v=1",
    apple: "/favicon.svg?v=1",
  },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: "https://hoodini.hu",
    siteName: "Hoodini",
    title: "Hoodini – Prémium Streetwear & Hoodiék",
    description: "Fedezd fel a Hoodini prémium streetwear kollekcióját.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hoodini Webshop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoodini – Prémium Streetwear",
    description: "Prémium hoodiék és streetwear ruházat gyors kiszállítással.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // Google Search Console hitelesítés
  verification: {
    google: "2VyWZ_3vxSTqJMyiYC-r8nD7iLTWXfYKNjzpMu3WQJw",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu" className={`${inter.variable} ${playfair.variable}`}>
      {/* Google Analytics 4 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-72WJP8ZPFR"
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-72WJP8ZPFR');
        `}
      </Script>
      {/* Google Ads */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18115939358"
        strategy="afterInteractive"
      />
      <Script id="google-ads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18115939358');
        `}
      </Script>
      <body className="font-sans bg-stone-50 text-stone-950 antialiased">
        <CartProvider>
          <Navbar />
          <main id="main-content">{children}</main>

          {/* ── Footer ── */}
          <footer className="bg-stone-950 text-stone-400">
            {/* Links */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-stone-800">
                <div>
                  <p className="label-xs text-stone-100 mb-5">Termékek</p>
                  <ul className="space-y-3 text-sm">
                    {[
                      { label: "Hoodie", href: "/products?category=hoodie" },
                      { label: "Pólók", href: "/products?category=polok" },
                      {
                        label: "Nadrágok",
                        href: "/products?category=nadrag",
                      },
                      { label: "Kiegészítők", href: "/products" },
                      { label: "Sale", href: "/products?category=sale" },
                    ].map((l) => (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          className="hover:text-stone-100 transition-colors"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="label-xs text-stone-100 mb-5">Segítség</p>
                  <ul className="space-y-3 text-sm">
                    {[
                      { label: "GYIK", href: "/help" },
                      { label: "Visszaküldés", href: "/visszakuldes" },
                      { label: "Szállítás", href: "/szallitas" },
                      { label: "Garancia", href: "/garancia" },
                    ].map((l) => (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          className="hover:text-stone-100 transition-colors"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="label-xs text-stone-100 mb-5">Rólunk</p>
                  <ul className="space-y-3 text-sm">
                    {[
                      { label: "Történetünk", href: "/tortenetunk" },
                      { label: "Fenntarthatóság", href: "/fenntarthatosag" },
                      { label: "Kapcsolat", href: "/kapcsolat" },
                      { label: "Karrier", href: "/karrier" },
                    ].map((l) => (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          className="hover:text-stone-100 transition-colors"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="label-xs text-stone-100 mb-5">Közösség</p>
                  <ul className="space-y-3 text-sm">
                    {[
                      {
                        label: "Instagram",
                        href: "https://instagram.com/hoodini.hu",
                      },
                      {
                        label: "TikTok",
                        href: "https://tiktok.com/@hoodini.hu",
                      },
                      {
                        label: "Facebook",
                        href: "https://facebook.com/hoodini.hu",
                      },
                      {
                        label: "Pinterest",
                        href: "https://pinterest.com/hoodini.hu",
                      },
                    ].map((l) => (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-stone-100 transition-colors"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="font-serif text-2xl font-bold text-stone-100 tracking-wide">
                  HOODINI
                </p>
                <p className="text-xs text-stone-600">
                  © 2026 Hoodini Kft. · Minden jog fenntartva ·{" "}
                  <a
                    href="#"
                    className="hover:text-stone-400 transition-colors"
                  >
                    Adatvédelem
                  </a>{" "}
                  &middot;{" "}
                  <a
                    href="#"
                    className="hover:text-stone-400 transition-colors"
                  >
                    ÁSZF
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
