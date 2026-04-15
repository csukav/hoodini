import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/firestoreProducts";

export const metadata: Metadata = {
  title: "Termékek – Teljes kollekció",
  description:
    "Fedezd fel a Hoodini teljes streetwear kollekcióját: hoodiék, pólók, nadrágok és kiegészítők. Ingyenes szállítás 15 000 Ft felett.",
};

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = [
    "Összes",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <p className="label-xs text-stone-500 mb-1">Kollekció</p>
      <h1 className="heading-display text-3xl sm:text-4xl text-stone-950 mb-1">
        Összes termék
      </h1>
      <p className="text-stone-400 text-sm mb-8">{products.length} termék</p>

      {/* Category pills */}
      <div
        className="flex flex-wrap gap-2 mb-10"
        role="list"
        aria-label="Kategóriák"
      >
        {categories.map((cat) => (
          <span
            key={cat}
            role="listitem"
            className="px-4 py-1.5 text-xs font-medium border border-stone-200 text-stone-600 hover:border-stone-900 hover:text-stone-950 cursor-pointer transition-all"
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Product grid */}
      {products.length === 0 ? (
        <p className="text-stone-400 text-sm">
          Még nincsenek termékek feltöltve.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
