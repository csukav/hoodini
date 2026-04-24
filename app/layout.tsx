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
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700", "900"],
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
  // Google Search Console hitelesítés – cseréld ki a saját kódodra:
   verification: { google: "bUAXV1LMsFSTTJaOmOr-LsbU-E-VqU3l31xbcuyHYjE" },
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
            {/* Newsletter */}
            <div className="border-b border-stone-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <p className="label-xs text-stone-200 mb-1">Iratkozz fel</p>
                  <p className="text-stone-400 text-sm">
                    Első rendelésedből 10% kedvezmény + exkluzív ajánlatok.
                  </p>
                </div>
                <form className="flex w-full md:w-auto gap-0">
                  <input
                    type="email"
                    placeholder="Email cím"
                    aria-label="Email cím a hírlevélhez"
                    className="flex-1 md:w-72 bg-stone-900 border border-stone-700 px-4 py-3 text-sm text-stone-100 placeholder-stone-600 outline-none focus:border-stone-400 transition-colors"
                  />
                  <button
                    type="submit"
                    className="btn-dark px-6 bg-stone-100 text-stone-950 hover:bg-white shrink-0"
                  >
                    FELIRATKOZÁS
                  </button>
                </form>
              </div>
            </div>

            {/* Links */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-stone-800">
                <div>
                  <p className="label-xs text-stone-100 mb-5">Termékek</p>
                  <ul className="space-y-3 text-sm">
                    {[
                      "Hoodiék",
                      "Pólók",
                      "Nadrágok",
                      "Kiegészítők",
                      "Sale",
                    ].map((l) => (
                      <li key={l}>
                        <a
                          href="#"
                          className="hover:text-stone-100 transition-colors"
                        >
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="label-xs text-stone-100 mb-5">Segítség</p>
                  <ul className="space-y-3 text-sm">
                    {["GYIK", "Visszaküldés", "Szállítás", "Garancia"].map(
                      (l) => (
                        <li key={l}>
                          <a
                            href="#"
                            className="hover:text-stone-100 transition-colors"
                          >
                            {l}
                          </a>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <div>
                  <p className="label-xs text-stone-100 mb-5">Rólunk</p>
                  <ul className="space-y-3 text-sm">
                    {[
                      "Történetünk",
                      "Fenntarthatóság",
                      "Kapcsolat",
                      "Karrier",
                    ].map((l) => (
                      <li key={l}>
                        <a
                          href="#"
                          className="hover:text-stone-100 transition-colors"
                        >
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="label-xs text-stone-100 mb-5">Közösség</p>
                  <ul className="space-y-3 text-sm">
                    {["Instagram", "TikTok", "Facebook", "Pinterest"].map(
                      (l) => (
                        <li key={l}>
                          <a
                            href="#"
                            className="hover:text-stone-100 transition-colors"
                          >
                            {l}
                          </a>
                        </li>
                      ),
                    )}
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
