"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { createProduct } from "@/lib/firestoreProducts";
import ProductForm, {
  type ProductFormValues,
} from "@/components/admin/ProductForm";

export default function NewProductPage() {
  const { user, loading } = useAdminAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-stone-400">
        Betöltés...
      </div>
    );
  }

  if (!user) {
    router.replace("/admin/login");
    return null;
  }

  async function handleSubmit(values: ProductFormValues) {
    await createProduct(values);
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
          Új termék hozzáadása
        </h1>
      </div>

      <div className="rounded bg-white p-8 shadow-sm">
        <ProductForm onSubmit={handleSubmit} submitLabel="Termék létrehozása" />
      </div>
    </div>
  );
}
