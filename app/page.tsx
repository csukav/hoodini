import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/firestoreProducts";
import HeroSection from "@/components/HeroSection";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Főoldal – Prémium Streetwear & Hoodie",
  description:
    "Üdvözlünk a Hoodini webshopban! Fedezd fel legújabb streetwear kollekcióinkat, prémium hoodiékat és egyedi darabokat ingyenes kiszállítással.",
};

const categories = [
  {
    label: "HOODIE",
    sub: "Prémium fit, minden napra.",
    href: "/products",
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&q=80",
  },
  {
    label: "PÓLÓK",
    sub: "Könnyű, légáteresztő anyagok.",
    href: "/products",
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=900&q=80",
  },
];

export default async function HomePage() {
  const products = await getProducts();
  const newArrivals = products.slice(0, 4);
  const bestSellers = products.slice(4, 8);

  return (
    <>
      <Script
        id="organization-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Hoodini",
            url: "https://hoodini.hu",
            logo: "https://hoodini.hu/og-image.jpg",
            description:
              "Prémium streetwear webshop – hoodiék, pólók, nadrágok ingyenes kiszállítással.",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              availableLanguage: "Hungarian",
            },
            sameAs: [
              "https://www.instagram.com/hoodini",
              "https://www.tiktok.com/@hoodini",
              "https://www.facebook.com/hoodini",
            ],
          }),
        }}
      />
        <main>

          <HeroSection />
          <section
            id="featured"
            className="three-home-section"
            aria-labelledby="new-arrivals-heading"
          >
            <div className="three-home-section-head">
              <div>
                <p className="three-home-kicker">Frissen érkezett</p>
                <h2 id="new-arrivals-heading" className="three-home-title">
                  New Arrivals
                </h2>
              </div>
              <Link href="/products" className="three-home-link">
                Összes termék
              </Link>
            </div>

            <div className="three-product-grid">
              {newArrivals.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="three-product-card"
                >
                  <div className="three-product-image-wrap">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="three-product-image"
                    />
                  </div>
                  <div className="three-product-meta">
                    <p className="three-product-name">{product.name}</p>
                    <p className="three-product-category">{product.category}</p>
                    <p className="three-product-price">{formatPrice(product.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="three-home-section" aria-labelledby="best-sellers-heading">
            <div className="three-home-section-head">
              <div>
                <p className="three-home-kicker">Kiemelt darabok</p>
                <h2 id="best-sellers-heading" className="three-home-title">
                  Best Sellers
                </h2>
              </div>
            </div>

            <div className="three-rail" role="list">
              {bestSellers.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="three-rail-item"
                  role="listitem"
                >
                  <span className="three-rail-index">0{(bestSellers.indexOf(product) % 9) + 1}</span>
                  <span className="three-rail-name">{product.name}</span>
                  <span className="three-rail-price">{formatPrice(product.price)}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="three-home-section three-home-bottom" aria-label="Kategóriák">
            <div className="three-home-section-head">
              <div>
                <p className="three-home-kicker">Kategória fókusz</p>
                <h2 className="three-home-title">Build Your Uniform</h2>
              </div>
            </div>

            <div className="three-category-grid">
              {categories.map((cat) => (
                <Link key={cat.label} href={cat.href} className="three-category-card">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="three-category-image"
                  />
                  <div className="three-category-overlay" aria-hidden="true" />
                  <div className="three-category-content">
                    <p className="three-category-label">{cat.label}</p>
                    <p className="three-category-sub">{cat.sub}</p>
                    <span className="three-home-link">Megnyitás</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
    </>
  );
}
