"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { getProductById, updateProduct } from "@/lib/firestoreProducts";
import ProductForm, {
  type ProductFormValues,
} from "@/components/admin/ProductForm";
import type { Product } from "@/types";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null | undefined>(undefined);

  useEffect(() => {
    getProductById(params.id).then((p) => setProduct(p ?? null));
  }, [params.id]);

  if (product === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center text-stone-400">
        Betöltés...
      </div>
    );
  }

  if (product === null) {
    notFound();
    return null;
  }

  async function handleSubmit(values: ProductFormValues) {
    await updateProduct(params.id, values);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/admin"
          className="text-xs font-semibold uppercase tracking-widest text-stone-400 hover:text-stone-900"
        >
          ← Vissza
        </Link>
        <h1 className="font-serif text-2xl font-bold tracking-tight">
          Termék szerkesztése
        </h1>
      </div>

      <div className="rounded bg-white p-8 shadow-sm">
        <ProductForm
          initial={{
            name: product.name,
            slug: product.slug,
            price: product.price,
            category: product.category,
            stock: product.stock,
            image: product.image,
            description: product.description,
            rating: product.rating,
            reviewCount: product.reviewCount,
          }}
          onSubmit={handleSubmit}
          submitLabel="Mentés"
        />
      </div>
    </div>
  );
}
