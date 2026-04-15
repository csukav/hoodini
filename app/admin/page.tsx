"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { getProducts, deleteProduct } from "@/lib/firestoreProducts";
import type { Product } from "@/types";

export default function AdminDashboardPage() {
  const { user, loading, signOut } = useAdminAuth();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [fetching, setFetching] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      getProducts()
        .then(setProducts)
        .finally(() => setFetching(false));
    }
  }, [user]);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Biztosan törlöd: „${name}"?`)) return;
    setDeletingId(id);
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeletingId(null);
  }

  async function handleSignOut() {
    await signOut();
    await fetch("/api/admin/session", { method: "DELETE" });
    router.push("/admin/login");
  }

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading || fetching) {
    return (
      <div className="flex min-h-screen items-center justify-center text-stone-400">
        Betöltés...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Top navbar */}
      <header className="sticky top-0 z-10 border-b border-stone-200 bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <span className="font-serif text-xl font-bold tracking-tight">
            Hoodini Admin
          </span>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/products/new"
              className="bg-stone-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-stone-700"
            >
              + Új termék
            </Link>
            <button
              onClick={handleSignOut}
              className="border border-stone-300 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-stone-600 hover:bg-stone-100"
            >
              Kijelentkezés
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Page title + search */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-serif text-2xl font-bold tracking-tight">
            Termékek{" "}
            <span className="text-base font-normal text-stone-400">
              ({products.length})
            </span>
          </h1>
          <input
            type="search"
            placeholder="Keresés neve vagy kategória szerint..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-stone-800 sm:w-64"
          />
        </div>

        {/* Empty state */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-stone-300 bg-white py-24 text-center">
            <p className="mb-4 text-stone-400">Még nincsenek termékek.</p>
            <Link
              href="/admin/products/new"
              className="bg-stone-900 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-stone-700"
            >
              + Első termék hozzáadása
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-12 text-center text-stone-400">
            Nincs találat: „{search}"
          </p>
        ) : (
          /* Product grid */
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-stone-200 transition hover:shadow-md hover:ring-stone-400"
              >
                {/* Image — click to edit */}
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="relative block aspect-[3/4] w-full overflow-hidden bg-stone-100"
                >
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition group-hover:scale-105"
                      sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-stone-300 text-xs">
                      Nincs kép
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                    <span className="rounded bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-stone-900">
                      Szerkesztés
                    </span>
                  </div>
                </Link>

                {/* Info */}
                <div className="flex flex-1 flex-col gap-1 px-3 py-3">
                  <p className="truncate text-sm font-semibold leading-tight">
                    {product.name}
                  </p>
                  <p className="text-xs capitalize text-stone-400">
                    {product.category}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="text-sm font-bold">
                      {product.price.toLocaleString("hu-HU")} Ft
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        product.stock === 0
                          ? "text-red-400"
                          : product.stock <= 3
                            ? "text-amber-500"
                            : "text-green-600"
                      }`}
                    >
                      {product.stock === 0
                        ? "Elfogyott"
                        : `${product.stock} db`}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex border-t border-stone-100">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="flex-1 py-2 text-center text-xs font-semibold uppercase tracking-widest text-stone-600 hover:bg-stone-50"
                  >
                    Szerkesztés
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id, product.name)}
                    disabled={deletingId === product.id}
                    className="flex-1 border-l border-stone-100 py-2 text-center text-xs font-semibold uppercase tracking-widest text-red-500 hover:bg-red-50 disabled:opacity-40"
                  >
                    {deletingId === product.id ? "..." : "Törlés"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
