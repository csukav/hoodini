import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/firestoreProducts";
import { normalizeCategorySlug } from "@/lib/productCategories";

interface ProductCategoryListProps {
  categorySlug: string;
  categoryLabel: string;
}

export default async function ProductCategoryList({
  categorySlug,
  categoryLabel,
}: ProductCategoryListProps) {
  const products = await getProducts();
  const filteredProducts = products.filter(
    (product) => normalizeCategorySlug(product.category) === categorySlug,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <div className="mb-6">
        <p className="label-xs text-stone-500 mb-1">Kategória</p>
        <h1 className="heading-display text-3xl sm:text-4xl text-stone-950 mb-1">
          {categoryLabel}
        </h1>
        <p className="text-stone-400 text-sm">
          {filteredProducts.length} termék ebben a kategóriában
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-3xl border border-stone-200 bg-stone-50 p-8 text-stone-600">
          <p className="text-sm mb-4">Ebben a kategóriában még nem található termék.</p>
          <Link
            href="/products"
            className="inline-flex items-center rounded-full border border-stone-900 bg-stone-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-stone-800"
          >
            Vissza az összes termékhez
          </Link>
        </div>
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
