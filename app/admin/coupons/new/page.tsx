"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { createCoupon } from "@/lib/firestoreCoupons";
import type { Coupon } from "@/types";

export default function NewCouponPage() {
  const { user, loading } = useAdminAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    code: "",
    description: "",
    discountType: "percentage" as "percentage" | "fixed",
    discountValue: 0,
    maxUsageCount: "",
    expiresAt: "",
    isActive: true,
    minOrderValue: "",
  });

  type CouponErrors = Record<string, string | undefined>;

  const [errors, setErrors] = useState<CouponErrors>({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/login");
    }
  }, [user, loading, router]);

  function validate() {
    const e: CouponErrors = {};

    if (!form.code.trim()) e.code = "Kötelező mező.";
    else if (form.code.length < 3) e.code = "Legalább 3 karakter szükséges.";

    if (!form.description.trim()) e.description = "Kötelező mező.";

    if (form.discountValue <= 0)
      e.discountValue = "Az érték nagyobb mint 0 kell, hogy legyen.";

    if (
      form.discountType === "percentage" &&
      form.discountValue > 100
    ) {
      e.discountValue = "Az érték 100%-nál nem lehet nagyobb.";
    }

    if (form.expiresAt && new Date(form.expiresAt) <= new Date()) {
      e.expiresAt = "A lejárati dátum a jövőben kell, hogy legyen.";
    }

    return e;
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (type === "number") {
      setForm((prev) => ({
        ...prev,
        [name]: value === "" ? "" : parseFloat(value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);
    setServerError("");

    try {
      const newCoupon: Omit<Coupon, "id" | "currentUsageCount" | "createdAt"> =
        {
          code: form.code.toUpperCase(),
          description: form.description,
          discountType: form.discountType,
          discountValue: form.discountValue as number,
          maxUsageCount: form.maxUsageCount
            ? parseInt(form.maxUsageCount)
            : undefined,
          expiresAt: form.expiresAt ? new Date(form.expiresAt) : undefined,
          isActive: form.isActive,
          minOrderValue: form.minOrderValue
            ? parseInt(form.minOrderValue)
            : undefined,
        };

      await createCoupon(newCoupon);
      router.push("/admin/coupons");
    } catch (error) {
      setServerError("Hiba a kupon mentése során. Próbáld újra.");
      console.error(error);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-stone-400">
        Betöltés...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Top navbar */}
      <header className="border-b border-stone-200 bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-4xl items-center gap-4">
          <Link href="/admin/coupons" className="text-stone-400 hover:text-stone-600">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-serif text-xl font-bold tracking-tight">
            Új kupon
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-lg border border-stone-200 bg-white p-6"
        >
          {serverError && (
            <div className="rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              {serverError}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {/* Kupon kód */}
            <div>
              <label className="block text-sm font-semibold text-stone-700">
                Kupon kód
              </label>
              <input
                type="text"
                name="code"
                placeholder="pl. SUMMER2024"
                value={form.code}
                onChange={handleChange}
                className={`mt-1 w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                  errors.code
                    ? "border-red-300 focus:ring-red-500"
                    : "border-stone-300 focus:ring-stone-800"
                }`}
              />
              {errors.code && (
                <p className="mt-1 text-xs text-red-600">{errors.code}</p>
              )}
            </div>

            {/* Leírás */}
            <div>
              <label className="block text-sm font-semibold text-stone-700">
                Leírás
              </label>
              <input
                type="text"
                name="description"
                placeholder="pl. Nyári akció"
                value={form.description}
                onChange={handleChange}
                className={`mt-1 w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                  errors.description
                    ? "border-red-300 focus:ring-red-500"
                    : "border-stone-300 focus:ring-stone-800"
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Engedmény típus */}
            <div>
              <label className="block text-sm font-semibold text-stone-700">
                Engedmény típusa
              </label>
              <select
                name="discountType"
                value={form.discountType}
                onChange={handleChange}
                className="mt-1 w-full rounded border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-stone-800"
              >
                <option value="percentage">Százalék (%)</option>
                <option value="fixed">Rögzített (Ft)</option>
              </select>
            </div>

            {/* Engedmény értéke */}
            <div>
              <label className="block text-sm font-semibold text-stone-700">
                Engedmény értéke
              </label>
              <input
                type="number"
                name="discountValue"
                placeholder="0"
                value={form.discountValue}
                onChange={handleChange}
                className={`mt-1 w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                  errors.discountValue
                    ? "border-red-300 focus:ring-red-500"
                    : "border-stone-300 focus:ring-stone-800"
                }`}
              />
              {errors.discountValue && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.discountValue}
                </p>
              )}
            </div>

            {/* Minimális rendelési érték */}
            <div>
              <label className="block text-sm font-semibold text-stone-700">
                Min. rendelési érték (Ft)
              </label>
              <input
                type="number"
                name="minOrderValue"
                placeholder="0 = nincs"
                value={form.minOrderValue}
                onChange={handleChange}
                className="mt-1 w-full rounded border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-stone-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Max felhasználás */}
            <div>
              <label className="block text-sm font-semibold text-stone-700">
                Max. felhasználás
              </label>
              <input
                type="number"
                name="maxUsageCount"
                placeholder="üres = korlátlan"
                value={form.maxUsageCount}
                onChange={handleChange}
                className="mt-1 w-full rounded border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-stone-800"
              />
            </div>

            {/* Lejárati dátum */}
            <div>
              <label className="block text-sm font-semibold text-stone-700">
                Lejárati dátum
              </label>
              <input
                type="date"
                name="expiresAt"
                value={form.expiresAt}
                onChange={handleChange}
                className={`mt-1 w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                  errors.expiresAt
                    ? "border-red-300 focus:ring-red-500"
                    : "border-stone-300 focus:ring-stone-800"
                }`}
              />
              {errors.expiresAt && (
                <p className="mt-1 text-xs text-red-600">{errors.expiresAt}</p>
              )}
            </div>
          </div>

          {/* Aktív */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="h-4 w-4 rounded border-stone-300"
            />
            <label htmlFor="isActive" className="text-sm font-semibold text-stone-700">
              Kupon aktív
            </label>
          </div>

          {/* Gombok */}
          <div className="flex gap-3 border-t border-stone-200 pt-6">
            <button
              type="submit"
              disabled={saving}
              className="rounded bg-stone-900 px-6 py-2 font-semibold text-white hover:bg-stone-700 disabled:opacity-50"
            >
              {saving ? "Mentés..." : "Kupon létrehozása"}
            </button>
            <Link
              href="/admin/coupons"
              className="rounded border border-stone-300 px-6 py-2 text-stone-700 hover:bg-stone-100"
            >
              Mégse
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
