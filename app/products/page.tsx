import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/firestoreProducts";
import { normalizeCategorySlug } from "@/lib/productCategories";

export const metadata: Metadata = {
  title: "Termékek – Teljes kollekció",
  description:
    "Fedezd fel a Hoodini teljes streetwear kollekcióját: hoodiék, pólók, nadrágok és kiegészítők. Ingyenes szállítás 15 000 Ft felett.",
};

export const dynamic = "force-dynamic";

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const selectedCategory = params.category?.toLowerCase() || null;
  const products = await getProducts();

  // Filter products by category if category param exists
  const filteredProducts = selectedCategory
    ? products.filter(
        (p) => normalizeCategorySlug(p.category) === selectedCategory,
      )
    : products;

  const categories = [
    "Összes",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  // Get display name for the selected category
  const getCategoryDisplayName = (slug: string | null) => {
    if (!slug) return "Összes termék";
    const categoryMap: Record<string, string> = {
      hoodie: "Hoodie",
      polok: "Pólók",
      nadragok: "Nadrágok",
      sale: "Sale",
    };
    return categoryMap[slug] || slug;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <p className="label-xs text-stone-500 mb-1">Kollekció</p>
      <h1 className="heading-display text-3xl sm:text-4xl text-stone-950 mb-1">
        {getCategoryDisplayName(selectedCategory)}
      </h1>
      <p className="text-stone-400 text-sm mb-8">
        {filteredProducts.length} termék
      </p>

      {/* Category pills */}
      <div
        className="flex flex-wrap gap-2 mb-10"
        role="list"
        aria-label="Kategóriák"
      >
        {categories.map((cat) => (
          <Link
            key={cat}
            role="listitem"
            href={
              cat === "Összes"
                ? "/products"
                : `/products?category=${normalizeCategorySlug(cat)}`
            }
            className={`px-4 py-1.5 text-xs font-medium border transition-all ${
              (cat === "Összes" && !selectedCategory) ||
              (cat !== "Összes" &&
                normalizeCategorySlug(cat) === selectedCategory)
                ? "border-stone-900 bg-stone-900 text-white"
                : "border-stone-200 text-stone-600 hover:border-stone-900 hover:text-stone-950"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Product grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-stone-400 text-sm">
          Ebben a kategóriában még nincsenek termékek.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
