"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export interface ProductFormValues {
  name: string;
  slug: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
}

interface ProductFormProps {
  initial?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => Promise<void>;
  submitLabel?: string;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
}

export default function ProductForm({
  initial = {},
  onSubmit,
  submitLabel = "Mentés",
}: ProductFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<ProductFormValues>({
    name: initial.name ?? "",
    slug: initial.slug ?? "",
    price: initial.price ?? 0,
    category: initial.category ?? "",
    stock: initial.stock ?? 0,
    image: initial.image ?? "",
    description: initial.description ?? "",
    rating: initial.rating ?? 0,
    reviewCount: initial.reviewCount ?? 0,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleNameChange(name: string) {
    setValues((v) => ({
      ...v,
      name,
      // Auto-generate slug only if slug was empty / unchanged from previous auto-slug
      slug:
        v.slug === slugify(v.name) || v.slug === "" ? slugify(name) : v.slug,
    }));
  }

  function set<K extends keyof ProductFormValues>(
    key: K,
    val: ProductFormValues[K],
  ) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  // Try to convert an imgur page URL to a direct image URL.
  // imgur.com/IMAGEID  →  https://i.imgur.com/IMAGEID.jpg
  // imgur.com/a/ALBUM  →  cannot convert (album), returns null
  function convertImgurUrl(raw: string): string | null {
    try {
      const url = new URL(raw);
      if (url.hostname === "imgur.com" || url.hostname === "www.imgur.com") {
        // Album or gallery — can't auto-convert
        if (
          url.pathname.startsWith("/a/") ||
          url.pathname.startsWith("/gallery/")
        ) {
          return null;
        }
        // Single image: /IMAGEID or /IMAGEID.ext
        const id = url.pathname.replace(/^\//, "").split(".")[0];
        if (id) return `https://i.imgur.com/${id}.jpg`;
      }
    } catch {
      // not a valid URL yet, ignore
    }
    return raw;
  }

  function imgurWarning(url: string): string | null {
    if (!url) return null;
    try {
      const u = new URL(url);
      if (u.hostname === "imgur.com" || u.hostname === "www.imgur.com") {
        if (
          u.pathname.startsWith("/a/") ||
          u.pathname.startsWith("/gallery/")
        ) {
          return "album";
        }
        return "page";
      }
      if (u.hostname === "i.imgur.com") return null; // correct
    } catch {
      /* ignore */
    }
    return null;
  }

  function handleImageChange(raw: string) {
    const converted = convertImgurUrl(raw);
    set("image", converted ?? raw);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await onSubmit(values);
      router.push("/admin");
    } catch (err) {
      console.error("[ProductForm] mentési hiba:", err);
      const msg = err instanceof Error ? err.message : "Ismeretlen hiba.";
      // Surface a friendly message for common Firebase misconfig
      if (
        msg.includes("projectId") ||
        msg.includes("invalid-argument") ||
        msg.includes("app/no-app")
      ) {
        setError("Firebase nincs konfigurálva. Töltsd ki az .env.local fájlt!");
      } else {
        setError(msg);
      }
    } finally {
      setSaving(false);
    }
  }

  const fieldClass =
    "w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-stone-800";
  const labelClass =
    "mb-1 block text-xs font-semibold uppercase tracking-widest text-stone-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label className={labelClass}>Név</label>
        <input
          type="text"
          required
          value={values.name}
          onChange={(e) => handleNameChange(e.target.value)}
          className={fieldClass}
        />
      </div>

      {/* Slug */}
      <div>
        <label className={labelClass}>Slug (URL-barát azonosító)</label>
        <input
          type="text"
          required
          value={values.slug}
          onChange={(e) => set("slug", e.target.value)}
          className={fieldClass}
        />
      </div>

      {/* Price + Stock */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Ár (Ft)</label>
          <input
            type="number"
            required
            min={0}
            value={values.price}
            onChange={(e) => set("price", Number(e.target.value))}
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass}>Készlet (db)</label>
          <input
            type="number"
            required
            min={0}
            value={values.stock}
            onChange={(e) => set("stock", Number(e.target.value))}
            className={fieldClass}
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className={labelClass}>Kategória</label>
        <select
          required
          value={values.category}
          onChange={(e) => set("category", e.target.value)}
          className={fieldClass}
        >
          <option value="">— válassz —</option>
          <option value="hoodie">Hoodie</option>
          <option value="polo">Póló</option>
          <option value="nadrág">Nadrág</option>
          <option value="sale">Sale</option>
        </select>
      </div>

      {/* Image URL */}
      <div>
        <label className={labelClass}>Kép URL</label>
        <input
          type="text"
          value={values.image}
          onChange={(e) => handleImageChange(e.target.value)}
          placeholder="https://i.imgur.com/IMAGEID.jpg"
          className={fieldClass}
        />

        {/* Imgur guidance */}
        {imgurWarning(values.image) === "album" && (
          <div className="mt-2 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 leading-relaxed">
            <strong>Ez egy imgur album link – nem tud betölteni.</strong>
            <br />
            Nyisd meg az albumot, kattints az egyik képre, majd{" "}
            <strong>jobb klikk → Kép másolása hivatkozásként</strong>. Az így
            kapott link{" "}
            <code className="rounded bg-amber-100 px-1">
              i.imgur.com/IMAGEID.jpg
            </code>{" "}
            formátumú lesz – azt illeszd be ide.
          </div>
        )}

        {/* Correct i.imgur.com or other domain — show preview */}
        {values.image && imgurWarning(values.image) !== "album" && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={values.image}
            alt="Előnézet"
            className="mt-2 h-32 w-auto rounded object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        )}

        <p className="mt-1 text-xs text-stone-400">
          Imgur esetén mindig{" "}
          <code className="rounded bg-stone-100 px-1">
            i.imgur.com/IMAGEID.jpg
          </code>{" "}
          formátumú közvetlen linket használj (nem album, nem oldal-link).
        </p>
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Leírás</label>
        <textarea
          rows={3}
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
          className={fieldClass}
        />
      </div>

      {/* Rating + Reviews */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Értékelés (0–5)</label>
          <input
            type="number"
            step={0.1}
            min={0}
            max={5}
            value={values.rating}
            onChange={(e) => set("rating", Number(e.target.value))}
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass}>Vélemények száma</label>
          <input
            type="number"
            min={0}
            value={values.reviewCount}
            onChange={(e) => set("reviewCount", Number(e.target.value))}
            className={fieldClass}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 pt-2">
        {error && (
          <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <strong>Hiba:</strong> {error}
          </p>
        )}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-stone-900 px-6 py-2.5 text-sm font-semibold uppercase tracking-widest text-white hover:bg-stone-700 disabled:opacity-50"
          >
            {saving ? "Mentés..." : submitLabel}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="border border-stone-300 px-6 py-2.5 text-sm font-semibold uppercase tracking-widest text-stone-600 hover:bg-stone-100"
          >
            Mégse
          </button>
        </div>
      </div>
    </form>
  );
}
