import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/firestoreProducts";

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
      <HeroSection />

      {/* ──────────── New Arrivals ──────────── */}
      <section
        id="featured"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
        aria-labelledby="new-arrivals-heading"
      >
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-stone-200">
          <div>
            <p className="label-xs text-stone-500 mb-1">Frissen érkezett</p>
            <h2
              id="new-arrivals-heading"
              className="heading-display text-3xl sm:text-4xl text-stone-950"
            >
              Új kollekció
            </h2>
          </div>
          <Link
            href="/products"
            className="label-xs text-stone-700 hover:text-stone-950 link-underline hidden sm:block transition-colors"
          >
            Összes megtekintése
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/products"
            className="label-xs text-stone-700 hover:text-stone-950 link-underline"
          >
            Összes megtekintése
          </Link>
        </div>
      </section>

      {/* ──────────── Category editorial ──────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24"
        aria-label="Kategóriák"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="group relative overflow-hidden block"
              style={{ aspectRatio: "4/5" }}
            >
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-8 left-8">
                <p className="heading-display text-white text-3xl sm:text-4xl mb-2">
                  {cat.label}
                </p>
                <p className="text-stone-300 text-sm mb-5">{cat.sub}</p>
                <span className="btn-white text-xs py-2.5 px-5">
                  VÁSÁROLJ MOST
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
