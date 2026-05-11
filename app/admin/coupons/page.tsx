"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Plus } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { getCoupons, deleteCoupon } from "@/lib/firestoreCoupons";
import { formatPrice } from "@/lib/utils";
import type { Coupon } from "@/types";

export default function CouponsPage() {
  const { user, loading } = useAdminAuth();
  const router = useRouter();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [fetching, setFetching] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      getCoupons()
        .then(setCoupons)
        .finally(() => setFetching(false));
    }
  }, [user]);

  async function handleDelete(id: string, code: string) {
    if (!confirm(`Biztosan törlöd: „${code}"?`)) return;
    setDeletingId(id);
    await deleteCoupon(id);
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    setDeletingId(null);
  }

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
          <Link href="/admin" className="font-serif text-xl font-bold tracking-tight hover:text-stone-600">
            Hoodini Admin
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="border border-stone-300 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-stone-600 hover:bg-stone-100"
            >
              Termékek
            </Link>
            <Link
              href="/admin/orders"
              className="border border-stone-300 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-stone-600 hover:bg-stone-100"
            >
              Rendelések
            </Link>
            <Link
              href="/admin/coupons/new"
              className="bg-stone-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-stone-700"
            >
              <Plus className="inline mr-1 h-4 w-4" /> Új kupon
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-6 font-serif text-2xl font-bold tracking-tight">
          Kuponok{" "}
          <span className="text-base font-normal text-stone-400">
            ({coupons.length})
          </span>
        </h1>

        {coupons.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-stone-300 bg-white py-24 text-center">
            <p className="mb-4 text-stone-400">Még nincsenek kuponok.</p>
            <Link
              href="/admin/coupons/new"
              className="bg-stone-900 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-stone-700"
            >
              <Plus className="inline mr-1 h-4 w-4" /> Első kupon hozzáadása
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-stone-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50">
                  <th className="px-4 py-3 text-left font-semibold text-stone-700">
                    Kód
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-stone-700">
                    Leírás
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-stone-700">
                    Típus
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-stone-700">
                    Érték
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-stone-700">
                    Felhasználás
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-stone-700">
                    Lejárta
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-stone-700">
                    Aktív
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-stone-700">
                    Műveletek
                  </th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr
                    key={coupon.id}
                    className="border-b border-stone-200 hover:bg-stone-50"
                  >
                    <td className="px-4 py-3 font-mono font-bold text-stone-900">
                      {coupon.code}
                    </td>
                    <td className="px-4 py-3 text-stone-600">
                      {coupon.description}
                    </td>
                    <td className="px-4 py-3 text-stone-600">
                      {coupon.discountType === "percentage" ? "%" : "Ft"}
                    </td>
                    <td className="px-4 py-3 font-semibold text-stone-900">
                      {coupon.discountType === "percentage"
                        ? `${coupon.discountValue}%`
                        : formatPrice(coupon.discountValue)}
                    </td>
                    <td className="px-4 py-3 text-stone-600">
                      {coupon.currentUsageCount}
                      {coupon.maxUsageCount && ` / ${coupon.maxUsageCount}`}
                    </td>
                    <td className="px-4 py-3 text-stone-600">
                      {coupon.expiresAt
                        ? new Date(coupon.expiresAt).toLocaleDateString("hu-HU")
                        : "Soha"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded px-2 py-1 text-xs font-semibold ${
                          coupon.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {coupon.isActive ? "Aktív" : "Inaktív"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDelete(coupon.id, coupon.code)}
                        disabled={deletingId === coupon.id}
                        className="text-red-600 hover:text-red-800 disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
