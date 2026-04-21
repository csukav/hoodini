import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Star, Package, Truck, RotateCcw, ChevronRight } from "lucide-react";
import { getProductBySlug } from "@/lib/firestoreProducts";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "@/components/AddToCartButton";
import ImageLightbox from "@/components/ImageLightbox";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

/* ── SEO Metadata ────────────────────────────────────────────────── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Termék nem található" };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
    },
  };
}

/* ── Page ────────────────────────────────────────────────────────── */
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  /* JSON-LD – sanitised to prevent script injection */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.id,
    brand: { "@type": "Brand", name: "Hoodini" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "HUF",
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `https://hoodini.hu/products/${product.slug}`,
      seller: { "@type": "Organization", name: "Hoodini" },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  const jsonLdStr = JSON.stringify(jsonLd)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  const benefits = [
    { icon: Truck, title: "Gyors kiszállítás", desc: "1–3 munkanap" },
    {
      icon: RotateCcw,
      title: "30 napos visszaküldés",
      desc: "Kérdések nélkül",
    },
    { icon: Package, title: "Ingyenes szállítás", desc: "15 000 Ft felett" },
  ];

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdStr }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-sm text-stone-400 flex items-center gap-1.5"
        >
          <Link href="/" className="hover:text-stone-900 transition-colors">
            Főoldal
          </Link>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          <Link
            href="/products"
            className="hover:text-stone-900 transition-colors"
          >
            Termékek
          </Link>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="text-stone-950 font-medium line-clamp-1">
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* ── Product image ── */}
          <ImageLightbox src={product.image} alt={product.name} />

          {/* ── Product details ── */}
          <div className="flex flex-col">
            <p className="label-xs text-stone-500">{product.category}</p>

            <h1 className="heading-display text-3xl sm:text-4xl text-stone-950 mt-2 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div
              className="flex items-center gap-3 mt-4"
              aria-label={`Értékelés: ${product.rating} / 5`}
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-stone-200 fill-stone-200"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-sm text-stone-500">
                <span className="font-semibold text-stone-800">
                  {product.rating}
                </span>{" "}
                · {product.reviewCount} értékelés
              </span>
            </div>

            {/* Price */}
            <div className="mt-6">
              <span className="text-4xl font-black text-stone-950">
                {formatPrice(product.price)}
              </span>
            </div>

            {/* Description */}
            <p className="mt-5 text-stone-600 leading-relaxed">
              {product.description}
            </p>

            {/* Stock indicator */}
            <div className="mt-5 flex items-center gap-2">
              <Package className="w-5 h-5 text-gray-400" aria-hidden="true" />
              {product.stock > 5 ? (
                <span className="text-sm text-green-600 font-semibold">
                  Raktáron – {product.stock} db elérhető
                </span>
              ) : product.stock > 0 ? (
                <span className="text-sm text-amber-600 font-semibold">
                  Csak {product.stock} db maradt!
                </span>
              ) : (
                <span className="text-sm text-red-600 font-semibold">
                  Elfogyott
                </span>
              )}
            </div>

            {/* Add to cart */}
            <div className="mt-8">
              <AddToCartButton product={product} />
            </div>

            {/* Benefits */}
            <ul className="mt-8 pt-8 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {benefits.map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex items-start gap-3">
                  <Icon
                    className="w-5 h-5 text-stone-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold text-stone-950">
                      {title}
                    </p>
                    <p className="text-xs text-stone-500 mt-0.5">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
